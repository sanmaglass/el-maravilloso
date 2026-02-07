// Supabase Sync Module
window.Sync = {
    client: null,

    // Inicializar cliente
    init: async () => {
        const url = localStorage.getItem('supabase_url');
        const key = localStorage.getItem('supabase_key');

        if (url && key) {
            try {
                window.Sync.client = supabase.createClient(url, key);
                console.log("Supabase inicializado correctamente.");
                return true;
            } catch (e) {
                console.error("Error inicializando Supabase:", e);
                return false;
            }
        }
        return false;
    },

    // Sincronización Completa
    syncAll: async () => {
        if (!window.Sync.client) return { success: false, error: "No conectado a la nube." };

        try {
            // Tablas a sincronizar
            const tables = ['employees', 'workLogs', 'products', 'promotions', 'settings'];

            for (const table of tables) {
                // 1. Pull: Traer datos de la nube
                const { data: cloudData, error } = await window.Sync.client
                    .from(table)
                    .select('*');

                if (error) throw error;

                // 2. Merge simplificado: Si no existe localmente, añadir.
                // En una app pro usaríamos timestamps (updated_at)
                for (const item of cloudData) {
                    const localItem = await window.db[table].get(item.id);
                    if (!localItem) {
                        await window.db[table].add(item);
                    }
                }

                // 3. Push: Enviar datos locales nuevos a la nube
                const localData = await window.db[table].toArray();
                const { error: pushError } = await window.Sync.client
                    .from(table)
                    .upsert(localData);

                if (pushError) throw pushError;
            }

            return { success: true };
        } catch (e) {
            console.error("Sync Error:", e);
            return { success: false, error: e.message };
        }
    }
};
