if (__DEVELOPMENT__) {
	/* You can set loglevel in your env file,
	if you have not installed this variable  script will use
	default value trace level, when you in development mode,
	for see all log information */
	const level = __LOGLEVEL__ || 'trace';
	log.setLevel(level);
} else {
	/* warn level, in production bandle, for error and warn messages,
	from users */
	log.setLevel('warn');
}
