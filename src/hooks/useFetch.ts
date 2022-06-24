import useSWR, { SWRConfiguration } from "swr";
import api from "../services/api";

export function useFetch<Data = any, Error = any>(
  url: string,
  config?: SWRConfiguration
) {
  const { data, error, mutate } = useSWR<Data, Error>(
    url,
    async (url) => {
      const response = await api.get(url);

      return response.data;
    },
    config
  );

  return { data, error, mutate };
}

// Items mais interessantes do SWRConfiguration
// config = {
// refreshInterval: 100, // De quanto em quanto tempo ele fica atualizando
// revalidateOnReconnect: true // Faz uma nova requisição quando a internet do usuário voltar

// errorRetryCount: 4 //Faz retentativas de consulta ao ter erro na api
// errorRetryInterval: 10000 //Faz retentativas de consulta dentro desse intervalo de tempo
// };
