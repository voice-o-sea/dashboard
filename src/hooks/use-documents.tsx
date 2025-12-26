import {
    useQuery,
    useMutation,
    type UseQueryResult,
    useQueryClient,
} from '@tanstack/react-query';
import supabase from '@/utils/supabase';
import type { Document, Reviewer } from '@/types/document';
import { useAuth } from '@/context/auth-context';

export function useDocuments(): UseQueryResult<Document[], Error> {
    return useQuery({
        queryKey: ['documents'],
        queryFn: async (): Promise<Document[] | []> => {
            //console.log('QUERY docs start');
            const { data, error } = await supabase
                .from('documents')
                .select(
                    `
                    id,
                    header,
                    type,
                    status,
                    target,
                    limit_value,
                    reviewer: reviewers (
                        id,
                        name
                    )
                `
                )
                .order('created_at', { ascending: false });
            //.limit(5);
            if (error) throw error;
            //console.log('QUERY docs done', data);

            const transformed: Document[] = (data || []).map((doc) => {
                return {
                    id: doc.id || '',
                    header: doc.header,
                    type: doc.type,
                    status: doc.status,
                    target: doc.target,
                    limit: doc.limit_value,
                    reviewer: (Array.isArray(doc.reviewer)
                        ? doc.reviewer[0] || null
                        : doc.reviewer || null) as Reviewer | null,
                };
            });

            return transformed || [];
        },
        staleTime: Infinity,
    });
}

export function useCreateDocument() {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: async (doc: Document) => {
            const dbDoc = {
                header: doc.header,
                type: doc.type,
                status: doc.status,
                target: doc.target,
                limit_value: doc.limit,
                reviewer_id: doc.reviewer?.id || null,
                user_id: user?.id,
            };
            //console.log('insert dbDoc', dbDoc);

            const { data, error } = await supabase
                .from('documents')
                .insert(dbDoc)
                .select();

            //console.log('insert result', data?.[0]);
            if (error) throw error;
            return data[0];
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
        },
    });
}

export function useUpdateDocument() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (doc: Document) => {
            const dbDoc = {
                header: doc.header,
                type: doc.type,
                status: doc.status,
                target: doc.target,
                limit_value: doc.limit,
                reviewer_id: doc.reviewer?.id || null,
            };
            //console.log('update dbDoc', dbDoc);
            const { data, error } = await supabase
                .from('documents')
                .update(dbDoc)
                .eq('id', doc.id)
                .select();

            //console.log('update result', data?.[0]);
            if (error) throw error;
            return data[0];
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
        },
    });
}

export function useDeleteDocument() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('documents')
                .delete()
                .eq('id', id);

            //console.log('delete result', id);
            if (error) throw error;
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
        },
    });
}
