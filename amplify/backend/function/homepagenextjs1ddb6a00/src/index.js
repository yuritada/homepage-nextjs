// AWS SDK v3 for SES をインポートします
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// どのAWSリージョンを使うかを設定し、SESを操作する準備をします
const sesClient = new SESClient({ region: process.env.AWS_REGION });

/**
 * この関数がLambdaの本体です。API Gatewayから呼び出されると実行されます。
 * @param {object} event - API Gatewayからのリクエスト情報（フォームの入力内容など）が含まれます
 */
export const handler = async (event) => {
  // フロントエンドから送られてきたフォームの入力内容（JSON形式）を、
  // JavaScriptで扱いやすいようにオブジェクトに変換します。
  const { name, email, message } = JSON.parse(event.body);

  // SESでメールを送信するための設定（パラメータ）を作成します
  const params = {
    // 送信元メールアドレス（SESで認証済みのもの）
    Source: "jkotqmrr.com", // ★★★ あなたの送信元アドレスに書き換えてください ★★★

    // 送信先メールアドレスの設定
    Destination: {
      ToAddresses: ["yuri.tada28@gmail.com"], // ★★★ あなたのGmailアドレスに書き換えてください ★★★
    },

    // メールの内容
    Message: {
      // 件名
      Subject: {
        Data: `ポートフォリオサイトから新しいお問合わせ: ${name}様`,
        Charset: "UTF-8",
      },
      // 本文
      Body: {
        Text: {
          Data: `
ウェブサイトのお問合わせフォームから以下の内容でメッセージが届きました。

--------------------------------
お名前: ${name}
返信先メールアドレス: ${email}

メッセージ本文:
${message}
--------------------------------
          `,
          Charset: "UTF-8",
        },
      },
    },
  };

  try {
    // 上記で作成した設定を元に「メール送信コマンド」を作成します
    const command = new SendEmailCommand(params);

    // SESに「メール送信コマンド」を実行するよう依頼します
    await sesClient.send(command);
    
    // 成功した場合、フロントエンドに「成功」の応答を返します
    return {
      statusCode: 200, // 成功を示すステータスコード
      headers: {
        "Access-Control-Allow-Origin": "*", // CORS設定（どのサイトからでもアクセス許可）
      },
      body: JSON.stringify({ message: "メッセージは正常に送信されました。" }),
    };
  } catch (error) {
    // エラー内容をログに出力します（CloudWatch Logsで確認できます）
    console.error(error);

    // 失敗した場合、フロントエンドに「エラー」の応答を返します
    return {
      statusCode: 500, // サーバーエラーを示すステータスコード
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "メッセージの送信に失敗しました。" }),
    };
  }
};