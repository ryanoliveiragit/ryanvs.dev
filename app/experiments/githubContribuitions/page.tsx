"use client";
import apiGithub from "@/api/github";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { Button } from "@/components/ui/button";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { Footer } from "@/components/footer/footer";
// Se o tipo da resposta da API for conhecido, substitua "ResponseType" por esse tipo
type ResponseType = {
  login: string;
  name: string;
  public_repos: number;
  // Adicione mais campos conforme necessário
};
interface Contribution {
  date: string;
  count: number;
}

interface MonthlyContribution {
  month: string;
  count: number;
}

interface YearlyContribution {
  year: string;
  count: number;
}

export default function GithubContributions() {
  var monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<ResponseType | null>(null);
  const [searchTerm, setSearchTerm] = useState("ryanoliveiragit");
  const [data, setData] = useState<any>(null);
  const [contributionData, setContributionData] = useState<
    { date: string; count: number }[]
  >([{ date: "2016-06-23", count: 2 }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setUser(null);
      setData("");
      if (searchTerm.trim() !== "") {
        const userResponse = await apiGithub.get(`/users/${searchTerm}`);
        const contributionsResponse = await axios.get(
          `https://github-contributions-api.jogruber.de/v4/${searchTerm}`
        );

        const userData = userResponse.data;
        const contributionsData = contributionsResponse.data.contributions;

        // Adicione as contribuições à sua constante contributionData
        setContributionData(
          contributionsData.map((contribution: any) => ({
            date: contribution.date,
            count: contribution.count,
          }))
        );

        const combinedData = {
          user: userData,
          contributions: contributionsData,
        };

        setUser(userData);
        setData(combinedData);
      }
    } catch (err) {
      console.error("Ops! Ocorreu um erro: " + err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Acessando valores usando notação de colchetes
  if (Array.isArray(contributionData)) {
    contributionData.map((contribution) => {
      return null;
    });
  }
  const countContributionsByMonth = (
    contributions: Contribution[]
  ): MonthlyContribution[] => {
    const contributionsByMonth: { [month: string]: number } = {};

    contributions.forEach((contribution) => {
      const month = contribution.date.substring(5, 7);
      contributionsByMonth[month] =
        (contributionsByMonth[month] || 0) + contribution.count;
    });

    return Object.keys(contributionsByMonth).map((month) => ({
      month,
      count: contributionsByMonth[month],
    }));
  };

  const countContributionsByYear = (
    contributions: Contribution[],
    targetYear: string
  ): YearlyContribution[] => {
    const contributionsByYear: { [year: string]: number } = {};

    contributions.forEach((contribution) => {
      const year = contribution.date.substring(0, 4);
      if (year === targetYear) {
        contributionsByYear[year] =
          (contributionsByYear[year] || 0) + contribution.count;
      }
    });

    return Object.keys(contributionsByYear).map((year) => ({
      year,
      count: contributionsByYear[year],
    }));
  };

  const contributionsByMonth2024 = countContributionsByMonth(
    contributionData.filter((contribution) =>
      contribution.date.startsWith("2024")
    )
  );

  const contributionsByMonth2023 = countContributionsByMonth(
    contributionData.filter((contribution) =>
      contribution.date.startsWith("2023")
    )
  );

  const contributionsByMonth2022 = countContributionsByMonth(
    contributionData.filter((contribution) =>
      contribution.date.startsWith("2022")
    )
  );

  const totalContributions2024 = contributionsByMonth2024.reduce(
    (accumulator, contribution) => accumulator + contribution.count,
    0
  );

  const totalContributions2023 = contributionsByMonth2023.reduce(
    (accumulator, contribution) => accumulator + contribution.count,
    0
  );

  const totalContributions2022 = contributionsByMonth2022.reduce(
    (accumulator, contribution) => accumulator + contribution.count,
    0
  );
  useEffect(() => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent); // Cria um objeto com o método preventDefault vazio
  }, [])

  console.log("Total de Commits:", totalContributions2024);

  console.log("total de commits", contributionsByMonth2023);

  return (
    <div
      className="w-screen flex justify-center items-center flex-col max-w-[640px]"
      id="githubContributions"
    >
      <h1 className="text-secondary-foreground text-3xl font-semibold mb-2">
        Github Contributions
      </h1>
      <h2 className="text-muted-foreground">
        Visualize, analise e compare seus commits
      </h2>
      <div className="scale-x-100">
        <hr className="w-[5rem] m-[3rem]" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-1 max-w-[400px] relative"
      >
        <Input
          type="text"
          placeholder="username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-14 w-screen text-lg max-w-[400px] dark:bg-[#35353531]  border border-divider"
        />
        <Button
          variant="ghost"
          type="submit"
          className="h-14  border border-divider dark:bg-[#35353531] "
        >
          {isLoading ? <LoadingSpinner /> : <Search />}
        </Button>
      </form>
{user ? 
      <section className="flex flex-col gap-5 mt-4">
        <section className="flex flex-col gap-2 mt-10">
          {user && (
            <div className="flex flex-row gap-2 justify-center px-16 mr-10">
              <div className="flex transform flex-1 flex-col items-center overflow-hidden rounded-lg border bg-white p-6 shadow-lg transition duration-300 ease-out border-divider glass hover:scale-[1.03] hover:shadow-2xl dark:bg-[#141414] dark:shadow-none">
              <span>Nome</span>
                <p className="mt-1 leading-6 text-gray-400">
                  <span>{user.name}</span>
                </p>
              </div>
              <div className="flex transform flex-1 flex-col items-center overflow-hidden rounded-lg border bg-white p-6 shadow-lg transition duration-300 ease-out border-divider glass hover:scale-[1.03] hover:shadow-2xl dark:bg-[#141414] dark:shadow-none">
              <span>Github</span>
                <p className="mt-1 leading-6 text-gray-400">
                  <span>{user.login}</span>
                </p>
              </div>
              <div className="flex transform flex-1 flex-col items-center overflow-hidden rounded-lg border bg-white p-6 shadow-lg transition duration-300 ease-out border-divider glass hover:scale-[1.03] hover:shadow-2xl dark:bg-[#141414] dark:shadow-none">
              <span>Repositorios</span>
                <p className="mt-1 leading-6 text-gray-400">
                  <span>{user.public_repos}</span>
                </p>
              </div>
            </div>
          )}
           <div className="scale-x-100">
        <hr className="w-[85%] m-[3rem]" />
      </div>
          {contributionsByMonth2024 && (
            <div className="ml-10 mt-10">
              <span
                key="username"
                className="text-muted-foreground font-semibold"
              >
                {totalContributions2024} contribuições em 2024
              </span>
            </div>
          )}
          <ResponsiveContainer width={900} height={400}>
            <BarChart
              width={500}
              height={300}
              data={contributionsByMonth2024}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(value) => monthNames[parseInt(value, 10) - 1]}
              />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />

              <Bar
                yAxisId="left"
                dataKey="count"
                fill="#8884d8"
                name="Contribuições"
              />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="flex flex-col gap-2">
          {contributionsByMonth2023 && (
            <div className="ml-10">
              <span
                key="username"
                className="text-muted-foreground font-semibold"
              >
                {totalContributions2023} contribuições em 2023
              </span>
            </div>
          )}
          <ResponsiveContainer width={900} height={400}>
            <BarChart
              width={500}
              height={300}
              data={contributionsByMonth2023}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(value) => monthNames[parseInt(value, 10) - 1]}
              />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />

              <Bar
                yAxisId="left"
                dataKey="count"
                fill="#8884d8"
                name="Contribuições"
              />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="flex flex-col gap-2">
          {contributionsByMonth2022 && (
            <div className="ml-10">
              <span
                key="username"
                className="text-muted-foreground font-semibold"
              >
                {totalContributions2022} contribuições em 2022
              </span>
            </div>
          )}
          <ResponsiveContainer width={900} height={400}>
            <BarChart
              width={500}
              height={300}
              data={contributionsByMonth2022}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(value) => monthNames[parseInt(value, 10) - 1]}
              />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />

              <Bar
                yAxisId="left"
                dataKey="count"
                fill="#8884d8"
                name="Contribuições"
              />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </section>

      : ''}
      <Footer />
    </div>
  );
}
