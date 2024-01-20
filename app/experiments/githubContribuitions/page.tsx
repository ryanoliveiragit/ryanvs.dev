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
  ResponsiveContainer,
} from "recharts";
import { Footer } from "@/components/footer/footer";
import axios from "axios";

interface Contribution {
  date: string;
  count: number;
}

type ResponseType = {
  login: string;
  name: string;
  public_repos: number;
  // Adicione mais campos conforme necessário
};
interface ContributionsByMonth {
  [month: string]: number;
}
interface MonthlyContribution {
  month: string;
  count: number;
}
interface ContributionsData {
  contributionsThisMonth: ContributionsByMonth;
  contributionsByYear: { [year: string]: number };
}

//SE VOCE ESTA VENDO ISSO, SAIBA QUE EU SEI QUE TA UMA BOSTA!!!! EU PENSEI EM ARRUMAR DPS MAS CERTEZA QUE NAO VOU
export default function GithubContributions() {
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
  }, []);

  console.log(
    "Total de Commits:",
    totalContributions2024 + totalContributions2023 + totalContributions2022
  );

  return (
    <div
      className="flex  flex-col justify-center items-center "
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
          className="h-14 w-full text-lg max-w-[400px] dark:bg-[#35353531]  border border-divider"
        />
        <Button
          variant="ghost"
          type="submit"
          className="h-14  border border-divider dark:bg-[#35353531] "
        >
          {isLoading ? <LoadingSpinner /> : <Search />}
        </Button>
      </form>
      <div className="w-screen max-w-[940px]">
        {user ? (
          <section className=" gap-5 mt-4">
            <section className="gap-2 mt-10">
              {user && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center md:px-16 mx-10 mb-16 items-center">
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
                    <span>Repositórios</span>
                    <p className="mt-1 leading-6 text-gray-400">
                      <span>{user.public_repos}</span>
                    </p>
                  </div>

                  <div className="flex transform flex-1 flex-col items-center overflow-hidden rounded-lg border bg-white p-6 shadow-lg transition duration-300 ease-out border-divider glass hover:scale-[1.03] hover:shadow-2xl dark:bg-[#141414] dark:shadow-none">
                    <span>Total de contribuições</span>
                    <p className="mt-1 leading-6 text-gray-400">
                      <span>
                        {totalContributions2024 +
                          totalContributions2023 +
                          totalContributions2022}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              <div className="scale-x-100">
                <hr className="w-[90%] m-[2rem] py-5" />
              </div>
              {totalContributions2024 && (
                <div className="ml-10 mt-6">
                  <span
                    key="username"
                    className="text-muted-foreground font-semibold"
                  >
                    {`${totalContributions2024} contribuições em 2024.`}
                  </span>
                </div>
              )}
              <ResponsiveContainer width={"100%"} height={400}>
                <BarChart
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
                    interval={0}
                    tick={(props) => {
                      const monthIndex = parseInt(props.payload.value, 10) - 1;
                      const monthNames = [
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
                      return (
                        <text
                          {...props}
                          x={props.x}
                          y={props.y}
                          dy={16}
                          textAnchor="middle"
                        >
                          {monthNames[monthIndex]}
                        </text>
                      );
                    }}
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
              {totalContributions2023 && (
                <div className="ml-10 mt-6">
                  <span
                    key="username"
                    className="text-muted-foreground font-semibold"
                  >
                    {`${totalContributions2023} contribuições em 2023.`}
                  </span>
                </div>
              )}

              <ResponsiveContainer width={"100%"} height={400}>
                <BarChart
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
                    interval={0}
                    tick={(props) => {
                      const monthIndex = parseInt(props.payload.value, 10) - 1;
                      const monthNames = [
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
                      return (
                        <text
                          {...props}
                          x={props.x}
                          y={props.y}
                          dy={16}
                          textAnchor="middle"
                        >
                          {monthNames[monthIndex]}
                        </text>
                      );
                    }}
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
              {totalContributions2022 && (
                <div className="ml-10 mt-6">
                  <span
                    key="username"
                    className="text-muted-foreground font-semibold"
                  >
                    {`${totalContributions2022} contribuições em 2022.`}
                  </span>
                </div>
              )}

              <ResponsiveContainer width={"100%"} height={400}>
                <BarChart
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
                    interval={0}
                    tick={(props) => {
                      const monthIndex = parseInt(props.payload.value, 10) - 1;
                      const monthNames = [
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
                      return (
                        <text
                          {...props}
                          x={props.x}
                          y={props.y}
                          dy={16}
                          textAnchor="middle"
                        >
                          {monthNames[monthIndex]}
                        </text>
                      );
                    }}
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
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
}
