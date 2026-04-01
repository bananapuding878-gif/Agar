// ==UserScript==
// @name         Agar Skin Uploader
// @namespace    https://github.com/bananapuding878-gif/Agar
// @version      1.1
// @description  Universal userscript for Agar.io with a toggleable menu, modal dialog, image upload functionality, and border color picker
// @author       bananapuding878-gif
// @match        https://agar.io/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Toggleable menu
    const menu = document.createElement('div');
    menu.id = 'agar-skin-menu';
    menu.style.position = 'absolute';
    menu.style.top = '10px';
    menu.style.right = '10px';
    menu.style.backgroundColor = 'white';
    menu.style.border = '1px solid #ccc';
    menu.style.padding = '10px';
    menu.style.zIndex = '999';
    menu.style.display = 'none';
    menu.style.borderRadius = '4px';
    document.body.appendChild(menu);

    const toggleButton = document.createElement('button');
    toggleButton.id = 'agar-toggle-btn';
    toggleButton.innerText = 'Toggle Menu';
    toggleButton.style.position = 'absolute';
    toggleButton.style.top = '10px';
    toggleButton.style.right = '10px';
    toggleButton.style.zIndex = '998';
    toggleButton.style.padding = '8px 12px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.onclick = function() {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    };
    document.body.appendChild(toggleButton);

    // Modal dialog
    const modal = document.createElement('div');
    modal.id = 'agar-skin-modal';
    const closeModal = () => { modal.style.display = 'none'; };
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.display = 'none';
    modal.style.zIndex = '1000';
    modal.style.borderRadius = '8px';
    modal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    document.body.appendChild(modal);

    const showModal = (content) => {
        modal.innerHTML = content;
        modal.style.display = 'block';
    };

    // Image upload functionality
    const uploadLabel = document.createElement('label');
    uploadLabel.innerText = 'Upload Skin: ';
    uploadLabel.style.display = 'block';
    uploadLabel.style.marginBottom = '10px';
    menu.appendChild(uploadLabel);

    const uploadInput = document.createElement('input');
    uploadInput.type = 'file';
    uploadInput.accept = 'image/*';
    uploadInput.id = 'agar-upload-input';
    uploadInput.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                showModal(`<img src='${img.src}' alt='Uploaded Image' style='max-width: 100%;'><br><button onclick="document.getElementById('agar-skin-modal').style.display='none'">Close</button>`);
            };
            reader.readAsDataURL(file);
        }
    };
    menu.appendChild(uploadInput);

    // Border color picker
    const colorLabel = document.createElement('label');
    colorLabel.innerText = 'Border Color: ';
    colorLabel.style.display = 'block';
    colorLabel.style.marginTop = '10px';
    colorLabel.style.marginBottom = '5px';
    menu.appendChild(colorLabel);

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.id = 'agar-color-picker';
    colorPicker.value = '#000000';
    colorPicker.onchange = function(event) {
        const color = event.target.value;
        document.body.style.borderColor = color;
    };
    menu.appendChild(colorPicker);

})();