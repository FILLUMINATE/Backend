const fs = require('fs');
const { Op } = require('sequelize');
const { Board } = require('../database/models');

class BoardService {
  async getNotice() {
    try {
      return await Board.findAll({ where: { isNotice: true } });
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async postBoard(boardDTO) {
    const { title, description, isNotice } = boardDTO;

    if (!title || !description || !isNotice) return 400;
    await Board.create({ title, description, isNotice });
    return 200;
  }
}

module.exports = BoardService;
