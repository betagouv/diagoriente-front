function classNames(...args: any[]): string {
  const classes: string[] = args.reduce((result, current) => {
    if (!current) return result;
    if (typeof current === 'string' || typeof current === 'number') return [...result, current];
    const keys = Object.keys(current);
    const values = keys.map(row => current[row]);
    return [...result, classNames(...values)];
  }, []);

  return classes.join(' ');
}

export default classNames;
