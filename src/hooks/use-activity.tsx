import type { Activity, ApiData } from '@/types/activity';
import { useQuery } from '@tanstack/react-query';
//import { fakeApiData } from './fake-api-data';

export function useActivity(quantity: number) {
    return useQuery({
        queryKey: ['activity', quantity],
        queryFn: async (): Promise<Activity[] | []> => {
            console.log('FETCH activity start');
            const res = await fetch(
                `https://fakerapi.it/api/v2/custom?_seed=12345&_quantity=${quantity}&mobile=number&desktop=number`
            );
            const json = await res.json();
            console.log('FETCH activity done', json);

            return formattedData(json.data) || [];

            // Faking in dev to not overuse api

            /* console.log('FETCH activity start');
            const json = formattedData(fakeApiData.slice(0, quantity));
            console.log('FETCH activity done', json);

            return json || []; */
        },
        staleTime: Infinity,
    });
}

function formattedData(data: ApiData[]): Activity[] {
    return data.map((d: ApiData, i: number) => ({
        date: new Date(Date.now() - (data.length - i - 1) * 86400000)
            .toISOString()
            .split('T')[0],
        mobile: d.mobile % 100,
        desktop: d.desktop % 100,
    }));
}
