import styles from "@/styles/Home.module.css";

type Props = {
  url: string;
};

export const ScrapThreadItemLink: React.FC<Props> = ({ url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "blue" }}
      className={styles.linkStyle}
    >
      {url}
    </a>
  );
};
