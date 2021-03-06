const express = require("express");
const db = require("../db");
const nodemailer = require("nodemailer");
const smtpPool = require("nodemailer-smtp-pool");
const dotenv = require("dotenv");
dotenv.config();

const smtpTransport = nodemailer.createTransport(
  smtpPool({
    service: "Gmail",
    host: "localhost",
    port: "465",
    tls: {
      rejectUnauthorize: false,
    },

    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
    maxConnections: 5,
    maxMessages: 10,
  })
);

const sendMail = async (email) => {
  await smtpTransport.sendMail(email, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Email Send Success : ", info);
    }
  });
};

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

      const sendData = {
        from: "4leaf-edu.com",
        to: email,
        subject: "π μλνμΈμ. Ruby-Talk λ‘κ·ΈμΈ λ³΄μμ½λ μλλ€.",
        html: `λ³΄μμ½λλ <h2>${code}</h2> μλλ€.`,
      };

      sendMail(sendData);
    });
  });

  return res.status(200).send("μ΄λ©μΌ λ‘κ·ΈμΈ μμ²­");
});

router.post("/checkCode", (req, res, next) => {
  const { email, code } = req.body;

  try {
    const checkQuery = `
      SELECT	id,
              email,
              nickname,
              avatar,
              statusMsg
        FROM	user
       WHERE  email = "${email}"
         AND  secretCode = ${code}
    `;

    db.query(checkQuery, (err, rows) => {
      if (err) {
        return res.status(400).send("λ‘κ·ΈμΈμ λ€μ μλν΄μ£ΌμΈμ.");
      }

      return res.status(200).json(rows[0]);
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("λ³΄μμ½λκ° μ¬λ°λ₯΄μ§ μμ΅λλ€.");
  }
});

router.post("/friend/list", (req, res, next) => {
  const { me } = req.body;

  try {
    const listQuery = `
      SELECT	id,
              nickname,
              statusMsg,
              avatar
        FROM	user
       WHERE	id	IN  (
                        SELECT	whom
                          FROM	friend
                         WHERE	who = ${me}
                      )
    `;

    db.query(listQuery, (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(400).send("μΉκ΅¬λͺ©λ‘μ λΆλ¬μ€λ λ° μ€ν¨νμ΅λλ€.");
      }

      return res.status(200).json(rows);
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("μΉκ΅¬λͺ©λ‘μ λΆλ¬μ€λ λ° μ€ν¨νμ΅λλ€.");
  }
});

module.exports = router;
