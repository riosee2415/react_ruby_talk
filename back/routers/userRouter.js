const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/emailCheck", async (req, res, next) => {
  const { email } = req.body;

  const searchQuery = `
  SELECT	id
    FROM	user
   WHERE	email = "${email}"
    `;

  db.query(searchQuery, (err, rows) => {
    if (rows.length === 0) {
      return res.status(400).json({ result: false });
    }

    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const num3 = Math.floor(Math.random() * 10);
    const num4 = Math.floor(Math.random() * 10);

    const code = "" + num1 + num2 + num3 + num4;

    const codeUpdateQuery = `
    UPDATE	user
       SET	secretCode = ${code},
            updatedAt = now()
     WHERE	id = ${rows[0].id}
    `;

    db.query(codeUpdateQuery, (err, rows) => {
      if (err) {
        return res.status(400).json({ result: false });
      }

      // smtp pool

      // 먼저 발신자의 정보를 등록한다. (앱 비밀번호)
      // 제목, 내용 등 발송할 이메일의 내용을 입력한다.
      // 수신자의 정보를 등록한다.
      // smtp TCP(25)에 전송한다.
      // 전송에 성공했는지 실패했는지 확인한다.
    });
  });

  return res.status(200).send("이메일 로그인 요청");
});

module.exports = router;
