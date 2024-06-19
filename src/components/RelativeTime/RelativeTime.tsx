import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

type RelativeTimeProps = {
  createdAt: Date;
  currentTime: Date;
};

export default function RelativeTime({
  createdAt,
  currentTime,
}: RelativeTimeProps) {
  const [relativeTimeString, setRelativeTimeString] = useState<string>("");

  useEffect(() => {
    setRelativeTimeString(dayjs(createdAt).from(currentTime));
  }, [createdAt, currentTime]);

  return <span>{relativeTimeString}</span>;
}
