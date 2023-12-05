const fs = require('fs');
const { Op, Sequelize } = require('sequelize');
const { Board, Image } = require('../database/models');

class BoardService {
  async getNotice() {
    try {
      return await Board.findAll({ where: { isNotice: true } });
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
  async getImg(boardId) {
    try {
      return await Image.findAll({
        attributes: ['imgLink'],
        where: { boardId },
      });
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
  async postBoard(boardDTO) {
    const { title, description, isNotice } = boardDTO;

    try {
      if (!title || !description || !isNotice) return 400;
      await Board.create({ title, description, isNotice });
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
}

module.exports = BoardService;
