const express = require('express');
const BoardService = require('../service/boardService');
const router = express.Router();
const multer = require('multer');
const boardService = new BoardService();
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    // 저장공간 정보를 하드 디스크에
    destination(req, file, done) {
      // 저장 위치
      done(null, './public/images/'); // 폴더 내에 저장
    },
    filename(req, file, done) {
      // 파일명을 어떤 이름으로 올릴지.
      const ext = path.extname(file.originalname); // 파일의 확장자
      done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 저장하기
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20메가 용량 제한
});

router.get('/notice', async (req, res) => {
  const result = await boardService.getNotice();

  return res.status(200).send(result);
});

router.get('/img/:id', async (req, res) => {
  const result = await boardService.getImg(req.params.id);
  return res.status(200).send(result);
});

router.post('/', upload.array('img'), async (req, res) => {
  const result = await boardService.postBoard(req.body);
  console.log(result[0].dataValues.boardId);
  for (const element of req.files) {
    await boardService.postImg(result[0].dataValues.boardId, element.filename);
  }
  return res.sendStatus(200);
});
module.exports = router;
