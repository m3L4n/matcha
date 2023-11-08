const db = require("../db/db");

class BlockModel {
  static update = async (id_receiver, id_requester, block) => {
    console.log(id_receiver, id_requester, block);
    try {
      const isBlockRowExist = await db.query(`SELECt id, "blocked" from block WHERE id_requester = $1 AND id_receiver = $2`, [id_requester, id_receiver]);
      if (isBlockRowExist.rowCount > 0) {
        const updateBlock = await db.query(`UPDATE block SET "blocked" = $1 WHERE id = $2 RETURNING *`, [block, isBlockRowExist.rows[0].id]);
        if (updateBlock.rowCount > 0) {
          return updateBlock.rows[0];
        } else {
          throw new Error("cant update the block relation, please retry later");
        }
      } else {
        const createBlock = await db.query(`INSERT INTO block (id_requester, id_receiver, "blocked") VALUES ($1, $2, $3) RETURNING *`, [id_requester, id_receiver, block]);
        if (createBlock.rowCount == 1) {
          return createBlock.rows[0];
        } else {
          console.l(createBlock);
          throw new Error("cant block this utilisateur");
        }
      }
    } catch (error) {
      return error;
    }
  };
  static getAll = async (idUser) => {
    try {
      const block = await db.query(
        `SELECT username, profile_picture, block.id_receiver ,blocked FROM block INNER JOIN users ON block.id_receiver = users.id WHERE id_requester = $1 AND "blocked" = $2`,
        [idUser, true]
      );
      return block.rows;
    } catch (error) {
      return error.message;
    }
  };
}
module.exports = {
  BlockModel,
};
