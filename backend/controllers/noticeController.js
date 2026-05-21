const Notice =
  require("../models/Notice");


// GET ALL NOTICES

const getNotices =
  async (req, res) => {

    try {

      const notices =
        await Notice.find()
          .sort({
            createdAt: -1
          });

      res.json(
        notices
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};


// ADD NOTICE

const addNotice =
  async (req, res) => {

    try {

      const {

        title,
        message

      } = req.body;

      const notice =
        await Notice.create({

          title,
          message,

          postedBy:
            req.user.role

        });

      res.status(201).json(
        notice
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};


// DELETE NOTICE

const deleteNotice =
  async (req, res) => {

    try {

      const deletedNotice =

        await Notice.findByIdAndDelete(

          req.params.id

        );

      if (!deletedNotice) {

        return res.status(404).json({

          message:
            "Notice not found"

        });

      }

      res.json({

        message:
          "Notice deleted successfully"

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};


module.exports = {

  getNotices,

  addNotice,

  deleteNotice

};