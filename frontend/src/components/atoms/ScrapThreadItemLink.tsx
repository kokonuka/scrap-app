import styles from "@/styles/Home.module.css";
import { Spinner } from "@chakra-ui/react";

type Props = {
  url: string;
};

export const ScrapThreadItemLink: React.FC<Props> = ({ url }) => {
  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "blue" }}
        className={styles.linkStyle}
      >
        {url}
      </a>
      <Spinner ml="2" size="xs" color="blue.500" />
    </>
  );
};
