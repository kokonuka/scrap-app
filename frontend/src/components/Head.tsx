import React from "react";
import NextHead from "next/head";

export const Head: React.FC = () => {
  const title = "SCRAPS | スクラップ記録サービス";
  const description =
    "SCRAPSはスクラップ記録サービスです。スレッド形式でメモを時系列に整理していくことができます。何か新しいことをキャッチアップする際、「情報量が多くまとまらない」「後でまとめようと思っていたけど思い出せない」なんてことはありませんか？SCRAPSではリアルタイムで考えていることや参考資料といった事柄をメモしていくことでそのような問題を解決できます";

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/boxes.png" />
      <meta property="og:url" content="https://scrap-app.vercel.app/" />
      <meta property="og:type" content="website" />
      <link rel="manifest" href="/manifest.webmanifest"></link>
    </NextHead>
  );
};
