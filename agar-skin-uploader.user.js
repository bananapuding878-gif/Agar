// ==UserScript==
// @name         Agar Skin Uploader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Improved userscript interface for Agar.io with a toggleable menu, modal dialog, image upload functionality, and border color picker
// @author       Your Name
// @match        https://agar.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Toggleable menu
    const menu = document.createElement('div');
    menu.style.position = 'absolute';
    menu.style.top = '10px';
    menu.style.right = '10px';
    menu.style.backgroundColor = 'white';
    menu.style.border = '1px solid #ccc';
    menu.style.padding = '10px';
    menu.style.display = 'none';
    document.body.appendChild(menu);

    const toggleButton = document.createElement('button');
    toggleButton.innerText = 'Toggle Menu';
    toggleButton.onclick = function() {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    };
    document.body.appendChild(toggleButton);

    // Modal dialog
    const modal = document.createElement('div');
    const closeModal = () => { modal.style.display = 'none'; };
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.display = 'none';
    modal.style.zIndex = '1000';
    document.body.appendChild(modal);

    const showModal = (content) => {
        modal.innerHTML = content;
        modal.style.display = 'block';
    };

    // Image upload functionality
    const uploadInput = document.createElement('input');
    uploadInput.type = 'file';
    uploadInput.accept = 'image/*';
    uploadInput.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                showModal(`<img src='${img.src}' alt='Uploaded Image' style='max-width: 100%;'><br><button onclick='closeModal()'>Close</button>`);
            };
            reader.readAsDataURL(file);
        }
    };
    menu.appendChild(uploadInput);

    // Border color picker
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.onchange = function(event) {
        const color = event.target.value;
        document.body.style.borderColor = color;
    };
    menu.appendChild(colorPicker);

})();