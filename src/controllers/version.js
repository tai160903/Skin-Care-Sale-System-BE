

const versionController = {
    async getVersion(req, res) {
        const response = "version 101";
        res.send(response); 
    }
};
    

module.exports = versionController;