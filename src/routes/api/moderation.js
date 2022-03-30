import { Router } from 'express'
const router = Router()

router.post("/ban", async (req, res) => {
    try {
        const user = req.body.user;
        const server = req.body.server;
        let razon = req.body.razon??"Sin razón especificada";
        if (!user) {
            res.json({
                error: "user no especificado",
            });
        } else if (!server) {
            res.json({
                error: "server no especificado",
            });
        } else if (!/^\d{18}$/g.test(user)) {
            res.json({
                error: "user debe ser un ID",
            });
        } else if (!/^\d{18}$/g.test(server)) {
            res.json({
                error: "server debe ser un ID",
            });
        } else {
            let ban = {};
            ban[`${server}`] = razon;
            db.doc(`usersApi/${user}/ban/servidores`)
                .update(ban)
                .then((result) => {
                    result.ok = true;
                    res.send(result);
                })
                .catch((err) => {
                    if (err.details.startsWith("No document to update")) {
                        db.doc(`usersApi/${user}/ban/servidores`).set(ban).then((result) => {

                            result.ok = true;
                            res.send(result);
                        }).catch((erro) => {
                            res.send(erro)
                        })
                    } else {
                        res.send(err)
                    }
                });
        }
    } catch (error) {
        console.log(error);
        res.json({
            error: "internal server error",
        });
    }
});

router.get("/user/:ID/ban", async (req, res) => {
    try {
        const user = req.params.ID;
        if (!user) {
            res.json({
                error: "user no especificado",
            });
        } else if (!/^\d{18}$/g.test(user)) {
            res.json({
                error: "user debe ser un ID",
            });
        } else {
            const userData = await db.doc(`usersApi/${user}/ban/servidores`).get()
            if (userData.exists) {
                const bans = [];
                for (const server in userData.data()) {
                    bans.push(userData.data()[server])
                }
                res.json({
                    isBanned: true,
                    bans: bans,
                    bansCount: bans.length
                });
            } else {
                res.json({
                    isBanned: false
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.json({
            error: "internal server error",
        });
    }
});

router.post("/unban", async (req, res) => {
    try {
        const user = req.body.user;
        const server = req.body.server;
        if (!user) {
            res.json({
                error: "user no especificado",
            });
        } else if (!server) {
            res.json({
                error: "server no especificado",
            });
        } else {
            let ban = {};
            ban[`${server}`] = FieldValue.delete();
            db.doc(`usersApi/${user}/ban/servidores`)
                .update(ban)
                .then((result) => {
                    result.ok = true;
                    res.send(result);
                });
            // }
        }
    } catch (error) {
        console.log(error);
        res.json({
            error: "internal server error",
        });
    }
});

router.post("/mute", async (req, res) => {
    try {
        const user = req.body.user;
        const server = req.body.server;
        let razon = req.body.razon;
        if (!user) {
            res.json({
                error: "user no especificado",
            });
        } else if (!server) {
            res.json({
                error: "server no especificado",
            });
        } else {
            if (!razon) razon = "Sin razón especificada";
            let mute = {
                razones: FieldValue.arrayUnion(razon),
                count: FieldValue.increment(1),
            };
            db.doc(`usersAPI/${user}/mute/${server}`)
                .update(mute)
                .then((result) => {
                    result.ok = true;
                    res.send(result);
                });
        }
    } catch (error) {
        console.log(error);
        res.json({
            error: "internal server error",
        });
    }
});

router.post("/kick", async (req, res) => {
    try {
        const user = req.body.user;
        const server = req.body.server;
        let razon = req.body.razon;
        if (!user) {
            res.json({
                error: "user no especificado",
            });
        } else if (!server) {
            res.json({
                error: "server no especificado",
            });
        } else if (!razon) {
            res.json({
                error: "razon no especificado",
            });
        } else {
            if (!razon) razon = "Sin razón especificada";
            let kick = {
                razones: FieldValue.arrayUnion(razon),
                count: FieldValue.increment(1),
            };
            bd.doc(`usersApi/${user}/kick/${server}`)
                .update(kick)
                .then((result) => {
                    result.ok = true;
                    res.send(result);
                });
        }
    } catch (error) {
        console.log(error);
        res.json({
            error: "internal server error",
        });
    }
});

router.get("/userbans", async (req, res) => {
    res.redirect("/");
});

router.get("/userbancount", async (req, res) => {
    res.redirect("/");
});

router.get("/serverban", async (req, res) => {
    res.redirect("/");
});

export { router as moderation }