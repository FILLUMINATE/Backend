const fs = require('fs');
const { Op, Sequelize } = require('sequelize');
const { Board, Image } = require('../database/models');
const { response } = require('express');

class BoardService {
  async getNotice() {
    try {
      return await Board.findAll({
        attributes: ['boardId', 'title'],
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
        attributes: ['boardId', 'title'],
        where: { isNotice: false },
      });
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async getOne(boardId) {
    try {
      return await Board.findAll({ where: { boardId } });
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
      console.log(id);
      const imgPut = await Image.findAll({
        attributes: ['imgLink'],
        where: { id },
      });
      await Image.destroy({ where: { id } });
      fs.unlinkSync('./public/images/' + imgPut[0].dataValues.imgLink);
      return;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
}

module.exports = BoardService;
