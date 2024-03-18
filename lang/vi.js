export default defineI18nLocale(async (locale) => {
    const viLangs = import.meta.glob('./modules/vi/*.js', {
        eager: true,
        import: 'default',
    })

    const viMessages = {};

    for (const path in viLangs) {
        if (viLangs.hasOwnProperty(path)) {
            const fileName = path.replace(/^.*[\\/]/, '').replace(/\.js$/, '');
            viMessages[fileName] = viLangs[path];
        }
    }

    return viMessages;
})