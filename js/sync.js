// Supabase Sync Module
window.Sync = {
    client: null,

    // Inicializar cliente
    init: async () => {
        const url = localStorage.getItem('supabase_url');
        const key = localStorage.getItem('supabase_key');

        if (url && key) {
            try {
                if (typeof supabase === 'undefined') {
                    throw new Error("El SDK de Supabase no se cargó. Revisa tu conexión a internet.");
                }

                window.Sync.client = supabase.createClient(url, key);

                // PRUEBA DE CONEXIÓN REAL: Intentar leer una tabla (ej. settings)
                // Usamos un limit(0) para que sea rápido y no traiga datos
                const { error } = await window.Sync.client.from('settings').select('key', { count: 'exact', head: true }).limit(1);

                if (error) {
                    // Si el error es de RLS o API Key, lo capturamos
                    if (error.code === 'PGRST301') throw new Error("API Key inválida.");
                    if (error.code === '42P01') throw new Error("Las tablas no existen. ¿Corriste el script SQL?");
                    throw new Error(error.message);
                }

                console.log("Supabase verificado y listo.");
                return { success: true };
            } catch (e) {
                console.error("Error inicializando Supabase:", e);
                window.Sync.client = null; // Asegurar que sea null si falla
                return { success: false, error: e.message };
            }
        }
        return { success: false, error: "Faltan credenciales." };
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
