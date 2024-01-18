"use client";
import apiGithub from "@/api/github";
import { useEffect, useState, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { Button } from "@/components/ui/button";
import Calendar from "react-github-contribution-calendar";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any>(null);
  const [contributionData, setContributionData] = useState<
    { date: string; count: number }[]
  >([{ date: "2016-06-23", count: 2 }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (searchTerm.trim() !== "") {
        const userResponse = await apiGithub.get(`/users/${searchTerm}`);
        const contributionsResponse = await axios.get(
          `https://github-contributions-api.jogruber.de/v4/${searchTerm}`
        );

        const userData = userResponse.data;
        const contributionsData = contributionsResponse.data.contributions;

        // Adicione as contribuições à sua constante contributionData
        setContributionData((prevData) => [
          ...prevData,
          ...contributionsData.map((contribution: any) => ({
            date: contribution.date,
            count: contribution.count,
          })),
        ]);

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

  return (
    <div
      className="w-screen flex justify-center items-center flex-col max-w-[640px]"
      id="home"
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
      <section className="flex flex-col gap-5 mt-4">
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
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="count"
              fill="#8884d8"
              name="Contribuições"
            />
          </BarChart>
        </ResponsiveContainer>

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
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="count"
              fill="#8884d8"
              name="Contribuições"
            />
          </BarChart>
        </ResponsiveContainer>

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
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="count"
              fill="#8884d8"
              name="Contribuições"
            />
          </BarChart>
        </ResponsiveContainer>

        {/* <div className="w-[540px]">
        <Calendar
          values={contributionDataObjectTwo}
          until={until}
          weekLabelAttributes={undefined}
          monthNames={monthNames}
          monthLabelAttributes={undefined}
          panelAttributes={undefined}
          panelColors={panelColors}
        />
      </div> */}
      </section>

      {user && (
        <div>
          <span key="username">Username: {user.login}</span>
          <span key="name">Name: {user.name}</span>
          <span key="repos">Public Repos: {user.public_repos}</span>
        </div>
      )}
    </div>
  );
}
