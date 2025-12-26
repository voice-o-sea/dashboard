import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import supabase from '@/utils/supabase';
import type { Reviewer } from '@/types/document';

export function useReviewers(): UseQueryResult<Reviewer[], Error> {
    return useQuery({
        queryKey: ['reviewers'],
        queryFn: async (): Promise<Reviewer[] | []> => {
            const { data, error } = await supabase
                .from('reviewers')
                .select('*');
            if (error) throw error;
            console.log('QUERY reviewers', data);
            return data || [];
        },
        staleTime: Infinity,
    });
}
