const fs = require('fs');
const { Op, Sequelize } = require('sequelize');
const { Board, Image, sequelize } = require('../database/models');

class BoardService {
  async getNotice() {
    try {
      return await Board.findAll({
        attributes: ['boardId', 'title', 'period'],
        where: { isNotice: true },
      });
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async getProject() {
    try {
      return await Board.findAll({
        attributes: ['boardId', 'title', 'period'],
        where: { isNotice: false },
      });
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async getOne(boardId) {
    try {
      const result = await Board.findAll({ where: { boardId } });
      console.log(result[0].dataValues.isNotice);
      if (result[0].dataValues.isNotice == 0) {
        delete result[0].dataValues.isNotice;
        return result;
      }
      delete result[0].dataValues.isNotice;
      delete result[0].dataValues.support;
      delete result[0].dataValues.address;
      delete result[0].dataValues.hashtag;
      return result;
    } catch (err) {
      console.log(err);
      return 404;
    }
  }

  async getImg(boardId) {
    try {
      return await Image.findAll({
        where: { boardId },
      });
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
  async postNotice(boardDTO) {
    const { title, description, period } = boardDTO;

    try {
      if (!title || !description) return 400;
      await Board.create({
        title,
        description,
        isNotice: true,
        period,
      });
      const result = await Board.findAll({
        attribute: [Sequelize.fn('MAX', Sequelize.col('boardId'))],
        order: [[Sequelize.col('boardId'), 'DESC']],
        limit: 1,
      });
      return result;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async postProject(boardDTO) {
    const { title, description, period, support, address, hashtag } = boardDTO;

    try {
      if (!title || !description) return 400;
      await Board.create({
        title,
        description,
        isNotice: false,
        period,
        support,
        address,
        hashtag,
      });
      const result = await Board.findAll({
        attribute: [Sequelize.fn('MAX', Sequelize.col('boardId'))],
        order: [[Sequelize.col('boardId'), 'DESC']],
        limit: 1,
      });
      return result;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async postImg(boardId, imgLink) {
    await Image.create({ boardId, imgLink });
    return;
  }

  async updateBoard(boardId, boardDTO) {
    try {
      await Board.update(boardDTO, { where: { boardId } });
      return;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async getImgById(id) {
    try {
      const imgPut = await Image.findAll({
        attributes: ['imgLink'],
        where: { id },
      });
      await Image.destroy({ where: { id } });
      console.log(imgPut[0].dataValues.imgLink);

      fs.unlinkSync('./public/images/' + imgPut[0].dataValues.imgLink);
      return;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async deleteById(boardId) {
    try {
      const data = await Image.findAll({
        where: { boardId },
      });

      let cnt = 0;
      while (data[cnt]) {
        console.log(data[cnt].dataValues.imgLink);
        await Image.destroy({
          where: { imgLink: data[cnt].dataValues.imgLink },
        });
        fs.unlinkSync('./public/images/' + data[cnt].dataValues.imgLink);
        cnt += 1;
      }

      await Board.destroy({ where: { boardId } });
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}

module.exports = BoardService;
