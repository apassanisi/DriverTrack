import { ref, onMounted } from 'vue';
import { useSupabase } from '@/composables/useSupabase';

export const useApi = <T>(table: string, id?: string, columns: string = '*') => {
  const supabase = useSupabase();
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);

  const handleResult = (result: T | null, operationError: Error | null) => {
    if (operationError) {
      error.value = `Error: ${operationError.message}`;
    } else if (!result && id) {
      error.value = 'Error: No rows returned';
    } else {
      data.value = result;
      error.value = null;
    }
  };

  const handleResponse = async (operation: () => Promise<{ data: T | null; error: Error | null }>) => {
    try {
      const { data: result, error: operationError } = await operation();
      handleResult(result, operationError);
      return { data: result, error: operationError };
    } catch (err) {
      error.value = `Unexpected error: ${(err as Error).message}`;
      return { data: null, error: err as Error };
    }
  };

  const handleQuery = (query: any) => handleResponse(() => query);

  const get = async () => {
    let query = supabase.from(table).select(columns);
    if (id) {
      query = query.eq('id', id).single();
    }
    await handleQuery(query);
  };

  const create = async (payload: T) => handleQuery(supabase.from(table).insert(payload));

  const update = async (payload: Partial<T>, updateId?: string) => handleQuery(supabase.from(table).update(payload).eq('id', updateId || id));

  const remove = async () => handleQuery(supabase.from(table).delete().eq('id', id));

  onMounted(get);

  return { data, error, get, create, update, remove };
};
