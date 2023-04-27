const detailControler = require("express").Router();
const { getAllAccessory } = require("../services/servicesAccessory");
const { getById, editCube, deleteById } = require("../services/servicesCube");

detailControler.get("/:productId", async (req, res) => {
    const id = req.params.productId;
    const dataProduct = await getById(id);
    const accessory = await getAllAccessory();
    const viewAccessory = accessory.filter(a => dataProduct.accessories.every(r => r._id.toString() !== a._id.toString()));

    dataProduct.hasOwner = false;

    if (dataProduct.owner.toString() == req.user?._id.toString()) {
        dataProduct.hasOwner = true;
    };

    res.render("details", {
        title: 'Cubicle / Attach Accessory',
        dataProduct,
        viewAccessory,
    });
});

detailControler.get('/:productId/edit', async (req, res) => {
    const idProdut = req.params.productId;
    const cubeInfor = await getById(idProdut);

    res.render('edit', {
        title: 'Edit Cube Page',
        cubeInfor,
    })
});

detailControler.post('/:productId/edit', async (req, res) => {
    const productId = req.params.productId;
    const body = req.body;

    const item = {
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        difficultyLevel: Number(body.difficultyLevel)
    }

    await editCube(productId, item);
    res.redirect(`/details/${productId}`)
});

detailControler.get('/:productId/delete', async (req, res) => {
    const productId = req.params.productId;
    const productData = await getById(productId);

    res.render('delete', {
        title: 'Delete Cube Page',
        productData
    })
});

detailControler.post('/:productId/delete', async (req, res) => {
    const productId = req.params.productId;
    await deleteById(productId);
    res.redirect('/');
});

module.exports = detailControler;
