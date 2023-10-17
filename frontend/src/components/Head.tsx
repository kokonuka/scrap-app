import React from "react";
import NextHead from "next/head";

export const Head: React.FC = () => {
  return (
    <NextHead>
      <title>SCRAPS | スクラップ記録サービス</title>
      <meta
        name="description"
        content="SCRAPSはスクラップ記録サービスです。スレッド形式でメモを時系列に整理していくことができます。何か新しいことをキャッチアップする際、「情報量が多くまとまらない」「後でまとめようと思っていたけど思い出せない」なんてことはありませんか？SCRAPSではリアルタイムで考えていることや参考資料といった事柄をメモしていくことでそのような問題を解決できます"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/boxes-stacked-solid.svg" />
    </NextHead>
  );
};
