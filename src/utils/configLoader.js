let appConfig = null;

export const loadConfig = async () => {
    if (!appConfig) {
        const response = await fetch('/AppConfig.json');
        if (!response.ok) {
            throw new Error("Error al cargar AppConfig.json");
        }
        appConfig = await response.json();
    }
    return appConfig;
};
