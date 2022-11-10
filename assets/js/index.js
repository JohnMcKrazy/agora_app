window.addEventListener("DOMContentLoaded", () => {
    //¿ PAGE ELEMENTS
    const verbalizacionesCardsFragment = document.createDocumentFragment();
    const itemsCardsFragment = document.createDocumentFragment();
    const BODY = document.querySelector("body");
    const closeElements = document.querySelectorAll(".close_element");
    const closeMenus = document.querySelectorAll(".close_menu");
    const clearInputsBtns = document.querySelectorAll(".clear_input_btn");
    //^^ TEMPLATES
    //¬ CARD VERBALIZACIONES
    const verbalizacionesCardTemplate = document.querySelector("#verbalizacion_card_template").content;
    const itemBtnTemplate = document.querySelector("#item_type_btn_template").content;
    //^^ MODALS
    //¬ LOG IN MODAL
    const logInModal = document.querySelector("#logIn_modal");
    //& LOG IN ELEMENTS
    const logInUser = document.querySelector("#user_input");
    const logInPassword = document.querySelector("#password_input");
    const logInResponseUser = document.querySelector("#user_response_container");
    const logInResponsePassword = document.querySelector("#password_response_container");
    const logInResponseUserText = document.querySelector("#user_response_container_text");
    const logInResponsePasswordText = document.querySelector("#password_response_container_text");
    const logInSubmitBtn = document.querySelector("#logIn_submit_btn");
    //^^ ALERTS
    //¬ WELCOME ALERT
    const welcomeAlert = document.querySelector("#welcome_alert");
    //& WELCOME ALERT ELEMENTS
    const userWelcomeAlert = document.querySelector(".user_name_welcome_alert");
    //^^  MENUS
    //¬NAVBAR TOP
    const nav = document.querySelector("#nav");
    const linkSectionBtns = document.querySelectorAll(".link_section_btn");
    //¬ USER MENU
    const userMenuBtn = document.querySelector("#user_menu_btn");
    const userMenu = document.querySelector("#user_menu");
    const userImg = document.querySelector("#img_user_menu");
    const userName = document.querySelector("#name_user_menu");
    const userAccess = document.querySelector("#access_user_menu");
    //¬ CONFIG USER MENU BTNS
    const themeUserConfigBtn = document.querySelector("#theme_menu_btn");
    const configUserConfigBtn = document.querySelector("#config_menu_btn");
    //^^ MENU ALERTS
    //¬ CONFIG MENU
    const configMenu = document.querySelector("#config_menu");
    //^^ MODAL ALERTS
    //¬ VERBALIZACION MODAL ALERT
    const verbalizacionModalAlert = document.querySelector("#verbalizacion_modal_alert");
    const idVerbalizacionModalAlert = document.querySelector("#id_verbalizacion_modal_alert");
    const nameVerbalizacionModalAlert = document.querySelector("#title_verbalizacion_modal_alert");
    const verbalizacionesBarPorcentage = document.querySelector(".bar_porcentage_verbalizacion_modal_alert");
    const verbalizacionText = document.querySelector(".verbalizacion_text");
    const itemsVerbalizacionesCardsContainer = document.querySelector("#item_verbalizaciones_alert_cards_container");
    //^^ SECTIONS
    //¬ VERBALIZACIONES SECTION
    const searchVerbalizacionesInput = document.querySelector("#search_verbalizaciones_input");
    const verbalisacionesCardsContainer = document.querySelector("#verbalizaciones_cards_container");
    //¬ ITEMS SECTION
    const searchItemsInput = document.querySelector("#search_items_input");
    const itemsCardsContainer = document.querySelector("#items_cards_container");
    //¿ *******************************************************************************************************************
    //¿CONSTANTS
    //&npx json-server -p 5000 -w ./assets/database/appDB2.json
    const DB_NAME = "agora";
    const DB_URL = "http://127.0.0.1:5500/assets/database/appDB2.json";

    const lightT = "light_theme";
    const darkT = "dark_theme";
    const lightThemeIcon = `<svg class="icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="clr-1" d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/></svg>`;
    const darkThemeIcon = `<svg class="icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="clr-1" d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"/></svg>`;

    const close = "close";
    const open = "open";

    //¿VARIANTS
    //^^BASIC DATABASE
    let currentDB = {};
    let currentClientsData;
    const appColors = currentDB.appColors;
    const appUsableSets = currentDB.appUsableSets;
    //^^USER DATABASE
    const currentUsers = [];
    let currentClientData = {};
    //^^VERBALIZACIONES DATABASE

    //^^ITEMS DATABASE

    const currentVerbalizaciones = [];
    const currentUsableSets = [];
    const currentPreguntas = [];
    const currentColores = [];
    //&solo para desarrollo quitar
    let logInStatus = open;
    //&& ***********************************
    let searchingDataStatus = close;
    let itemsModalStatus = close;
    let userMenuStatus = close;
    let configMenuStatus = close;
    let verbalizacionModalStatus = close;
    //^^CLASSES
    //¬ CLIENT CLASS
    class Cliente {
        constructor(cliente, data_encuestas = {}, verbalizaciones = {}) {
            this.cliente = cliente;
            this.data_encuestas = data_encuestas || {};
            this.verbalizaciones = verbalizaciones || {};
        }
    }
    //¿ *******************************************************************************************************************

    //¿ GENERAL FUNCTIONS

    //^^ PROPER CASE TRANSFORM
    const properCase = (string) => {
        return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
    };
    //^^DELATE CHILDREN--START
    const deleteChildElements = (parentElement) => {
        let child = parentElement.lastElementChild;
        while (child) {
            parentElement.removeChild(child);
            child = parentElement.lastElementChild;
        }
    };
    //^^ CLEAR INPUTS IN STARTS
    const clearInputsPage = () => {
        logInUser.value = null;
        logInPassword.value = null;
        searchVerbalizacionesInput.value = null;
    };
    clearInputsPage();
    //^^TO THE TOP
    const toTheTop = () => {
        const currentPosition = BODY.getBoundingClientRect().top;
        window.scrollTo(currentPosition, 0);
    };
    //^SCROLL T0-- START
    const scrollToSection = (btn) => {
        console.log(btn.dataset.target);
        const section = document.querySelector(`#${btn.dataset.target}`);
        const windowTop = window.top;
        const windowHeight = window.innerHeight / 2;
        const sectionTop = section.getBoundingClientRect().top;
        const navHeight = nav.getBoundingClientRect().height;
        const navTop = nav.getBoundingClientRect().top;
        //*console.log(section);
        //*console.log(windowTop);
        //*console.log(windowHeight);
        //*console.log(sectionTop);
        //*console.log(navHeight);
        //*console.log(navTop);
        if (navTop >= windowHeight) {
            let fixTop = sectionTop - navHeight;
            window.scrollBy(windowTop, fixTop);
        } else if (navTop < windowHeight) {
            let fixTop = sectionTop - navHeight;
            window.scrollBy(windowTop, fixTop);
        }
    };
    //^^ CHANGE BODY CLASS THEME BY THE HOUR OF THE DAY
    const checkTime = () => {
        const date = new Date();
        const time = date.getHours();
        //*console.log(time);
        const isNight = time < 8 || time > 19;
        switch (isNight) {
            case true:
                BODY.className = darkT;
                themeUserConfigBtn.innerHTML = lightThemeIcon;
                return darkT;
            case false:
                BODY.className = lightT;
                themeUserConfigBtn.innerHTML = darkThemeIcon;
                return lightT;
            default:
                console.log("tienes un porblema con tu funcion checkTime");
                return;
        }
    };
    let currentTheme = checkTime();
    //^^ FADE IN ANIMATION FUNCTION
    const fadeIn = (item, display, delay) => {
        item.style.display = display;
        setTimeout(() => {
            item.style.transition = `all ${delay}ms ease`;
            item.style.opacity = 1;
        }, 200);
    };
    //^^ FADE OUT ANIMATION FUNCTION
    const fadeOut = (item, delay) => {
        const timeOut = delay + 200;
        item.style.transition = `all ${delay}ms ease`;
        item.style.opacity = `0`;
        setTimeout(() => {
            item.style.display = `none`;
        }, timeOut);
    };
    //^^ OPEN LEFT MENU
    const openMenu = (item) => {
        item.style.transform = "translateX(0)";
    };
    const closeMenu = (item) => {
        item.style.transform = "translateX(100%)";
    };
    //^^ FIRST DATA CHECK
    const databaseFirstCheck = () => {
        const localDB = localStorage.getItem(DB_NAME);
        //*console.log(JSON.parse(localDB));
        switch (localDB) {
            case null:
                //*console.log("No existe, creando Database");
                const fetchData = async (url) => {
                    try {
                        const rawData = await fetch(url);
                        const data = await rawData.json();
                        //*console.log(data);
                        localStorage.setItem(DB_NAME, JSON.stringify(data));
                        currentDB = JSON.parse(localStorage.getItem(DB_NAME));
                        currentClientsData = currentDB.data;
                        //*console.log(currentClientData);
                        currentClientsData.forEach((client) => {
                            const USERS = client.cliente_data.users;
                            USERS.forEach((user) => {
                                //*console.log(user);
                                const USER_NICKNAME = user.user_nickname;
                                const userExist = currentUsers.includes(USER_NICKNAME);
                                switch (userExist) {
                                    case true:
                                        //*console.log(`El usuario ${USER_NICKNAME} ya existe en la base de datos`);
                                        return;
                                    case false:
                                        //*console.log(`El usuario ${USER_NICKNAME} no existe en la base de datos`);
                                        currentUsers.push(user);
                                        return;
                                }
                            });
                        });
                        console.log(currentUsers);
                        return;
                    } catch (err) {
                        //*console.log(err);
                    }
                };
                fetchData(DB_URL);
                return;
            default:
                //*console.log("Existe Database, actualizando datos");
                currentDB = JSON.parse(localDB);
                //*console.log(currentDB);
                const CLIENTS = currentDB.data;
                CLIENTS.forEach((client) => {
                    const USERS = client.cliente_data.users;
                    USERS.forEach((user) => {
                        //*console.log(user);
                        const USER_NICKNAME = user.user_nickname;
                        const userExist = currentUsers.includes(USER_NICKNAME);
                        switch (userExist) {
                            case true:
                                //*console.log(`El usuario ${USER_NICKNAME} ya existe en la base de datos`);
                                return;
                            case false:
                                //*console.log(`El usuario ${USER_NICKNAME} no existe en la base de datos`);
                                currentUsers.push(user.user_nickname);
                                return;
                        }
                    });
                });
            //*console.log(currentUsers);
        }
    };
    databaseFirstCheck();
    //¿ FUNCTIONS

    //^^ LOG IN SUBMIT ACTIONS
    const checkUser = () => {
        const inputUser = logInUser.value.trim().toString();
        const inputPassword = logInPassword.value.trim().toString();
        console.log(inputUser, inputPassword);
        if (inputUser === "" || inputUser === null || inputPassword === "" || inputPassword === null) {
            console.log("Necesitas llenar los datos de usuario");

            logInResponseUser.style.background = "red";
            logInResponsePassword.style.background = "red";
            fadeIn(logInResponseUser, "block", 500);
            fadeIn(logInResponsePassword, "block", 500);

            logInResponseUserText.textContent = "Todos los campos deben de llenarse";
            logInResponsePasswordText.textContent = "Todos los campos deben de llenarse";
        } else {
            console.log("Se recibio el usuario correctamente");
            console.log(currentUsers);
            const userExist = currentUsers.includes(inputUser);
            switch (userExist) {
                case false:
                    console.log("Este usuario es incorrecto");
                    return;
                case true:
                    console.log("Este usuario es correcto");
                    const CLIENTS = currentDB.data;
                    console.log(CLIENTS);
                    CLIENTS.forEach((client) => {
                        console.log(client);
                        const USERS = client.cliente_data.users;
                        const CLIENT_DATA = client.cliente_data;
                        USERS.forEach((user) => {
                            console.log(user);
                            const isCurrentUser = user.user_nickname === inputUser;
                            switch (isCurrentUser) {
                                case false:
                                    return;
                                case true:
                                    console.log(user);
                                    const userPassword = user.user_password;
                                    const inputPassword = logInPassword.value.trim().toString();
                                    const isUser = userPassword === inputPassword;
                                    switch (isUser) {
                                        case false:
                                            console.log("Esta contraseña es incorrecta");
                                            return;
                                        case true:
                                            console.log("La contraseña es correcta");
                                            currentClientData = user;
                                            console.log(client, user);
                                            userImg.setAttribute("src", currentClientData.user_img);
                                            userName.textContent = currentClientData.user_name;
                                            userAccess.textContent = currentClientData.user_access;
                                            fadeOut(logInModal, 1000);
                                            //&HACER CLASS CON INFO DE CLIENTE ACTUAL
                                            createCurrentUsables(client);
                                            //^^CLASS INFO CURRENT CLIENT

                                            setTimeout(() => {
                                                userWelcomeAlert.textContent = currentClientData.user_name;
                                                fadeIn(welcomeAlert, "flex", 1000);
                                                //*createCurrentUsables();
                                                createVerbalizacionesCards(currentVerbalizaciones);
                                                setTimeout(() => {
                                                    setActionAccederCardsBtn();
                                                    return;
                                                }, 500);
                                                setTimeout(() => {
                                                    fadeOut(welcomeAlert, 1000);
                                                }, 3000);
                                            }, 1200);
                                    }
                                    return;
                            }
                        });
                    });
                    return;
            }
        }
    };
    const clearInput = (e, currentData) => {
        const currentId = e.target.dataset.target;
        console.log(currentId);
        const currentTarget = document.querySelector(`#${currentId}_input`);
        currentTarget.value = null;
        if (currentId === "search_verbalizaciones") {
            console.log(currentVerbalizaciones);
            createVerbalizacionesCards(currentVerbalizaciones);
            setTimeout(() => {
                setActionAccederCardsBtn();
                return;
            }, 500);
        }
    };
    const userMenuActions = () => {
        const isOpen = userMenuStatus === open;
        switch (isOpen) {
            case true:
                closeMenu(userMenu);
                userMenuStatus = close;
                return;
            case false:
                const isTheOtherOpen = configMenuStatus === open;
                switch (isTheOtherOpen) {
                    case false:
                        openMenu(userMenu);
                        userMenuStatus = open;
                        return;

                    case true:
                        openMenu(userMenu);
                        userMenuStatus = open;
                        return;
                }
        }
    };
    const changeThemeActions = () => {
        console.log(currentTheme);
        const isLight = currentTheme === lightT;
        switch (isLight) {
            case true:
                themeUserConfigBtn.innerHTML = lightThemeIcon;
                BODY.classList.add(darkT);
                BODY.classList.remove(lightT);
                currentTheme = darkT;
                console.log("cambiando a tema obscuro");
                return;
            case false:
                themeUserConfigBtn.innerHTML = darkThemeIcon;
                BODY.classList.add(lightT);
                BODY.classList.remove(darkT);
                currentTheme = lightT;
                console.log("cambiando a tema claro");
                return;
        }
    };
    const configBtnActions = () => {
        const isOpen = configMenuStatus === open;
        switch (isOpen) {
            case false:
                configMenuStatus = open;
                const isVerbalizacionModalClose = verbalizacionModalStatus === close;
                console.log(isVerbalizacionModalClose);
                switch (isVerbalizacionModalClose) {
                    case true:
                        fadeIn(configMenu, "inherit", 1000);
                        return;
                    case false:
                        fadeOut(verbalizacionModalAlert, 1000);
                        verbalizacionModalStatus = close;
                        setTimeout(() => {
                            fadeIn(configMenu, "inherit", 1000);
                            return;
                        }, 1300);
                }
            case true:
                configMenuStatus = close;
                fadeOut(configMenu, 1000);
                return;
        }
    };
    const createNewCard = (data) => {
        //*console.log(data);
        const id = data.verbalizacionId;
        const nombre = data.verbalizacion_nombre;
        let codificadas = 0;
        let noCodificadas = 0;
        const verbalizaciones = data.info_verbalizacion;
        //*console.log(verbalizaciones);
        verbalizaciones.forEach((verbalizacion) => {
            //*console.log(verbalizacion);
            //*const coded = verbalizacion.coded_status === "coded";
            //*const noCoded = verbalizacion.coded_status === "no coded";
            const noCoded = verbalizacion.usableSets.length === 0;
            switch (noCoded) {
                case true:
                    noCodificadas++;
                    return;
                case false:
                    codificadas++;
                    return;
            }
        });
        const porcentageBruto = (100 / (codificadas + noCodificadas)) * codificadas;
        //^^FUNCION PARA CREACION DE PORCENTAJE EN TARJETA
        const number = parseFloat(porcentageBruto);
        let newNumber = "";
        const numberPorcentFix = (porcent) => {
            if (porcent < 100) {
                const isOneItem = porcent.toString().length === 1;
                //*console.log(isOneItem);
                switch (isOneItem) {
                    case true:
                        newNumber = `${porcent.toString()}`;
                        //*console.log(`Es porcentaje de 1 digito= ${porcent},Y el recortado es= ${newNumber}`);
                        return;
                    case false:
                        const isTwoItems = porcent.toString().length === 2;
                        //*console.log(isTwoItems);
                        switch (isTwoItems) {
                            case true:
                                newNumber = `${porcent.toString()}`;
                                /*  console.log(
                  `Es un porcentaje de 2 digitos= ${porcent},Y el recortado es= ${newNumber}`
                ); */
                                return;
                            case false:
                                const isThree = porcent.toString().length === 3;
                                //*console.log(isThree);
                                switch (isThree) {
                                    case true:
                                        newNumber = `${porcent.toString()}`;
                                        /* console.log(
                      `Es un porcentaje de 3 digitos= ${porcent},Y el recortado es= ${newNumber}`
                    ); */
                                        return;
                                    case false:
                                        const isFourOrMore = porcent.toString().length >= 4;
                                        //*console.log(isFourOrMore);
                                        switch (isFourOrMore) {
                                            case true:
                                                newNumber = `${porcent.toString()[0]}${porcent.toString()[1]}${porcent.toString()[2]}${porcent.toString()[3]}`;
                                                /*  console.log(
                          `Es un porcentaje de 4 digitos o mas= ${porcent},Y el recortado es= ${newNumber}`
                        ); */
                                                return;
                                            default:
                                                /*  console.log(
                          `Concatenacion de porcentaje mas largo, esto no deberia de salir`
                        ); */
                                                return;
                                        }
                                }
                        }
                }
            } else if ((porcent = 100)) {
                newNumber = porcent.toString();
                console.log(`Es 100% = ${porcent}%`);
            } else if (porcent > 100) {
                newNumber = porcent.toString();
                console.log("esto no deberia de salir, es solo por precaucion");
            }
        };
        numberPorcentFix(number);
        const newCloneCard = verbalizacionesCardTemplate.cloneNode(true);
        const cardId = newCloneCard.querySelector("#id_verbalizacion_card");
        const cardName = newCloneCard.querySelector("#name_verbalizacion_card");
        //^^PORCENTAGE NUMBER ELEMENT
        const cardPorcentage = newCloneCard.querySelector(".advance_porcentage");
        //^^ PORCENTAGE BAR ELEMENT
        const cardBarPorcentage = newCloneCard.querySelector(".bar_porcentage_verbalizacion_card");
        //^^VERBALIZACIONES CODIFICADAS TOTAL
        const cardAdvanceCountTotal = newCloneCard.querySelector(".advance_count_total");
        //^^ VERBALIZACIONES CODIFICADAS PREOGRESS
        const cardAdvanceCountProgress = newCloneCard.querySelector(".advance_count_progress");
        //^^ ORDEN ID
        const faltantes = newCloneCard.querySelector(".rest_text");

        //^^ ACCESS BTN
        const accessBtnsVerbalizacionesCard = newCloneCard.querySelector(".card_btn_verbalizaciones");

        if (number > 50) {
            //*console.log(`Es mayor de 50% = ${porcentageBruto}%`);
            cardBarPorcentage.style.background = "var(--colorOk)";
            cardBarPorcentage.style.width = `${porcentageBruto}%`;
        } else if (number <= 50) {
            //*console.log(`Es menor o igual 50% = ${porcentageBruto}%`);
            cardBarPorcentage.style.background = "var(--colorBad)";
            cardBarPorcentage.style.width = `${porcentageBruto}%`;
        }

        faltantes.textContent = noCodificadas;
        cardId.textContent = id;
        cardName.textContent = nombre;
        cardPorcentage.textContent = `${newNumber}%`;
        cardAdvanceCountTotal.textContent = codificadas + noCodificadas;
        cardAdvanceCountProgress.textContent = codificadas;
        accessBtnsVerbalizacionesCard.setAttribute("id", data.verbalizacionId);
        verbalizacionesCardsFragment.appendChild(newCloneCard);
        //*console.log(newCloneCard);
    };
    const createVerbalizacionesCards = (thisClient) => {
        deleteChildElements(verbalizacionesCardsFragment);

        //&CREATE CARDS SEGUN SI ES ENTRADA POR USUARIO O POR DATABASE
        //*console.log(thisClient);
        const isLogInOpen = logInStatus === open;
        switch (isLogInOpen) {
            case false:
                console.log(thisClient);
                deleteChildElements(verbalisacionesCardsContainer);
                thisClient.forEach((verbalizacion) => {
                    createNewCard(verbalizacion);
                });
                verbalisacionesCardsContainer.appendChild(verbalizacionesCardsFragment);
                return;
            case true:
                deleteChildElements(verbalisacionesCardsContainer);
                //*console.log(thisClient);
                thisClient.forEach((verbalizacion) => {
                    //*console.log(verbalizacion);
                    createNewCard(verbalizacion);
                });
                verbalisacionesCardsContainer.appendChild(verbalizacionesCardsFragment);
                return;
        }
    };
    const stylePorcentageData = (num, bru, cod, noCod, prog, total) => {
        if (num > 50) {
            console.log(`Es mayor de 50% = ${bru}%`);
            verbalizacionesBarPorcentage.style.background = "var(--colorOk)";
            verbalizacionesBarPorcentage.style.width = `${bru}%`;
        } else if (num <= 50) {
            console.log(`Es menor o igual 50% = ${bru}%`);
            verbalizacionesBarPorcentage.style.background = "var(--colorBad)";
            verbalizacionesBarPorcentage.style.width = `${bru}%`;
        }
        prog.textContent = cod;
        total.textContent = cod + noCod;
    };
    const openEncuesta = (item) => {
        const targetName = item.id;
        console.log(item, targetName);

        currentVerbalizaciones.forEach((verbalizacion) => {
            if (verbalizacion.verbalizacionId === targetName) {
                //*console.log(verbalizacion.verbalizacion_nombre);
                //*console.log(verbalizacion);
                //^^ VERBALIZACION DATA
                const id = verbalizacion.verbalizacionId;
                const nombre = verbalizacion.verbalizacion_nombre;
                let codificadas = 0;
                let noCodificadas = 0;
                const verbalizaciones = verbalizacion.info_verbalizacion;
                verbalizaciones.forEach((verbalizacion_data) => {
                    //*console.log(verbalizacion_data);
                    //~~ UPDATING CURRENT PREGUNTAS
                    currentPreguntas.push(verbalizacion_data);
                    const noUsableSets = verbalizacion_data.usableSets.length === 0;
                    //*console.log(noUsableSets);
                    switch (noUsableSets) {
                        case false:
                            codificadas++;
                            return;
                        case true:
                            noCodificadas++;
                            return;
                    }
                });
                const porcentageBruto = (100 / (codificadas + noCodificadas)) * codificadas;
                const number = parseFloat(porcentageBruto);

                const countProgress = verbalizacionModalAlert.querySelector(".advance_count_progress");
                const countTotal = verbalizacionModalAlert.querySelector(".advance_count_total");
                stylePorcentageData(number, porcentageBruto, codificadas, noCodificadas, countProgress, countTotal);

                idVerbalizacionModalAlert.textContent = id;
                nameVerbalizacionModalAlert.textContent = nombre;

                //^^ *****************************
                currentPreguntas.forEach((pregunta) => {
                    //*console.log(pregunta);
                    const noUsableSets = pregunta.usableSets === 0;
                    switch (noUsableSets) {
                        case false:
                            //*console.log(pregunta);
                            return;
                        case true:
                            //*console.log(pregunta);
                            return;
                    }
                });
                verbalizacionText.textContent = currentPreguntas[0].pregunta;

                createItems(itemsVerbalizacionesCardsContainer);
            }
        });
        //^^ THIS FUNCTION CHECK IF THE CONFIG MENU IS OPEN
        fadeIn(verbalizacionModalAlert, "block", 500);
        verbalizacionModalStatus = open;
    };
    const createItems = (contText, frag = []) => {
        const noUsableSets = currentUsableSets.length === 0;
        console.log(noUsableSets);
        if (noUsableSets === true) {
            console.log("No tienes usableSets en tu DB, mostrando datos");
            contText.innerHTML = '<h3 class="noItems_text">No hay Items guardados</h3>';
            return;
        } else if (noUsableSets === false) {
            console.log("Si tienes usableSets en tu DB, creando items");
            currentUsableSets.forEach((usable) => {
                //*console.log(usable);
            });
            return;
        }
    };
    //¿ *******************************************************************************************************************
    //¿ ELEMENTS TEMPLATES
    const setActionAccederCardsBtn = () => {
        setTimeout(() => {
            const accessBtnsVerbalizacionesCard = document.querySelectorAll(".card_btn_verbalizaciones");
            accessBtnsVerbalizacionesCard.forEach((btn) => {
                btn.addEventListener("click", () => {
                    openEncuesta(btn);
                });
            });
        }, 2000);
    };
    //¿ ADD EVENT LISTENERS
    //&ESTO ES SOLO PARA DESARROLLO EDITAR Y ELIMINAR

    const createCurrentUsables = (data) => {
        const coldColors = currentDB.appColors.coldColors;
        const coldestColors = currentDB.appColors.coldestColors;
        const warmColors = currentDB.appColors.warmColors;
        coldColors.forEach((color) => {
            currentColores.push(color);
        });

        const VERBALIZACIONES = data.cliente_data.verbalizaciones;
        VERBALIZACIONES.forEach((verbalizacion) => {
            currentVerbalizaciones.push(verbalizacion);
        });
        const USABLES = data.cliente_data.usableSets;
        const hasUsableSets = USABLES.length === 0;
        //*console.log(hasUsableSets);
        switch (hasUsableSets) {
            case false:
                USABLES.forEach((usableSet) => {
                    currentUsableSets.push(usableSet);
                });
                //*console.log(currentColores, currentVerbalizaciones, currentUsableSets);
                return;
            case true:
                //*console.log("This cliente no tiene usables", currentUsableSets);

                //*console.log(currentColores, currentVerbalizaciones);
                return;
        }

        //^^ *************************************************************************
    };
    const checkLogIn = () => {
        //*console.log(logInStatus);
        const isLogInOpen = logInStatus === open;
        switch (isLogInOpen) {
            case false:
                logInModal.style.display = "none";
                logInModal.style.opacity = "0";
                const DATA = currentDB.data;
                const CURRENT_CLIENT = DATA[1];
                currentClientData = CURRENT_CLIENT.cliente_data.users[0];
                createCurrentUsables(CURRENT_CLIENT);
                createVerbalizacionesCards(currentVerbalizaciones);
                verbalisacionesCardsContainer.appendChild(verbalizacionesCardsFragment);
                setTimeout(() => {
                    setActionAccederCardsBtn();
                    //& PARA DESARROLLO BORRAR AL DEJAR DE OCUPAR

                    createItems(itemsCardsContainer);
                    //& ***************************************************/
                    return;
                }, 500);
            case true:
                logInSubmitBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    checkUser();
                    //*console.log("Log in submit btn running");
                    return;
                });
        }
    };

    setTimeout(() => {
        checkLogIn();
    }, 500);

    const checkSearch = (e) => {
        searchingDataStatus = open;
        const mySearch = e.target.value;
        //*console.log(mySearch);
        currentVerbalizaciones.forEach((verbalizacion) => {
            const NOMBRE_VERBALIZACION = verbalizacion.verbalizacion_nombre;
            const ID_VERBALIZACION = verbalizacion.verbalizacionId;

            let properSearchName;
            if (mySearch.toString().length >= 1) {
                properSearchName = mySearch.toLowerCase();
            } else if (mySearch.toString().length === 0) {
                properSearchName = mySearch.toString();
            }
            const properSearchId = mySearch.toUpperCase();
            const properId = ID_VERBALIZACION.toUpperCase();
            const properName = properCase(NOMBRE_VERBALIZACION);
            const currentNombres = verbalizacion.verbalizacion_nombre.toLowerCase();
            const namesSplit = currentNombres.split(" ");
            //*console.log(namesSplit);
            if (properSearchName === "") {
                console.log("es un string vacio");
                createVerbalizacionesCards(currentVerbalizaciones);
                setTimeout(() => {
                    setActionAccederCardsBtn();
                    return;
                }, 500);
            } else {
                const newSearch = [];
                namesSplit.forEach((palabra) => {
                    const includes = palabra.includes(properSearchName);
                    switch (includes) {
                        case false:
                            return;
                        case true:
                            deleteChildElements(verbalisacionesCardsContainer);
                            //! ***************************************************
                            //*console.log(verbalizacion.verbalizacion_nombre);
                            if (!newSearch.includes(verbalizacion)) {
                                newSearch.push(verbalizacion);
                                createNewCard(verbalizacion);
                            }
                            //*createNewCard(verbalizacion);
                            //! *************************************************
                            return;
                    }
                });
            }

            //¿?PARA ARREGLAR
            /* else if (properSearchName === properName) {
        deleteChildElements(verbalizacionesCardsFragment);
        deleteChildElements(verbalisacionesCardsContainer);
        console.log(verbalizacion, properSearchName);
        createNewCard(verbalizacion);
        verbalisacionesCardsContainer.appendChild(verbalizacionesCardsFragment);
        setTimeout(() => {
          setActionAccederCardsBtn();
          return;
        }, 500);
      } else if (properSearchId === properId) {
        deleteChildElements(verbalizacionesCardsFragment);
        deleteChildElements(verbalisacionesCardsContainer);
        console.log(verbalizacion, properSearchId);
        createNewCard(verbalizacion);
        verbalisacionesCardsContainer.appendChild(verbalizacionesCardsFragment);
        setTimeout(() => {
          setActionAccederCardsBtn();
          return;
        }, 500);
      } */
        });

        verbalisacionesCardsContainer.appendChild(verbalizacionesCardsFragment);
    };
    //&ESTA ESTA ESPERANDO ACTUALIZACION DE DESARROLLO
    //^^ LOG IN ACTIONS
    logInSubmitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        checkUser();
        console.log("Log in submit btn running");
    });
    //&& **********************************************************

    //& ***********************************************************
    //^^ CLEAR INPUTS
    clearInputsBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            console.log(btn);
            clearInput(e, currentClientData);
        });
    });
    //^^ CLOSE ELEMENTS BTNS
    closeElements.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            console.log(e.target);
            const windowToClose = document.querySelector(`#${e.target.dataset.target}`);
            console.log(windowToClose);
            if (e.target.dataset.element === "configMenuStatus") {
                configMenuStatus = close;
            } else if (e.target.dataset.element === "verbalizacionModalStatus") {
                verbalizacionModalStatus = close;
            }

            console.log(e.target.dataset.target);
            fadeOut(windowToClose, 1000);
        });
    });
    //^^ CLOSE MENUS BTNS
    closeMenus.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const windowToClose = document.querySelector(`#${e.target.dataset.target}`);
            console.log(windowToClose);
            if (e.target.dataset.element === "userMenuStatus") {
                userMenuStatus = close;
                console.log("se a cerrado el menu por close btn");
            }
            console.log(e.target.dataset.target);
            closeMenu(windowToClose, 1000);
        });
    });
    //^^ MENU BTNS ACTIONS
    userMenuBtn.addEventListener("click", userMenuActions);

    //^^ THEME USER MENU BTN ACTIONS
    themeUserConfigBtn.addEventListener("click", changeThemeActions);
    //^^ CONFIG USER MENU BTN ACTIONS
    configUserConfigBtn.addEventListener("click", configBtnActions);

    //~~ LINKS NAV ACTIONS -- REVISION
    linkSectionBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            scrollToSection(btn);
        });
    });
    //^^INPUT SEARCH VERBALIZACION
    searchVerbalizacionesInput.addEventListener("input", (e) => {
        setTimeout(() => checkSearch(e), 500);
    });
    //& ********************************************************************************************************************
    //& LISTENERS TO REMOVE
    document.querySelector("#delete_db_btn").addEventListener("click", () => {
        localStorage.removeItem(DB_NAME);
        console.log("Borrando localStorage");
    });
    document.querySelector("#change_theme_btn").addEventListener("click", changeThemeActions);
});
