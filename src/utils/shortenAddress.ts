const shortenAddress = (addr: string) => {
    if (!addr || addr.length <= 12) return addr;
    const start = addr.slice(0, 12);
    const end = addr.slice(-10);
    return `${start}...${end}`;
  };