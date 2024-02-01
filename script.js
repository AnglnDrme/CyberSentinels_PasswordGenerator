//Displaying the value of the input range
    var range_length = document.getElementById("range_value");
    var range_value = document.getElementById("display_range");
    
    range_length.addEventListener('input', function() {
        range_value.textContent = range_length.value < 10 ? "0" + range_length.value : range_length.value;
    });


//Show History
    var view_history = document.getElementById("view_history");
    var content_2 = document.getElementById("content_2");

    view_history.addEventListener('click', () => content_2.classList.add('show_content'));


//Hide History
    var hide_history = document.getElementById("hide_history");

    hide_history.addEventListener('click', () => content_2.classList.remove('show_content'));
    window.addEventListener('click', e => e.target == content_2 ? content_2.classList.remove('show_content') : false);


//Show Strength Meter
    var view_strength_meter = document.getElementById("view_strength_meter");
    var content_3 = document.getElementById("content_3");

    view_strength_meter.addEventListener('click', () => content_3.classList.add('show_content'));


//Hide Strength Meter
    var hide_strength_meter = document.getElementById("hide_strength_meter");
        
    hide_strength_meter.addEventListener('click', () => {
        empty_strength_meter();
    });
    window.addEventListener('click', e => e.target == content_3 ? empty_strength_meter() : false);


//Empty Strength Meter
    function empty_strength_meter() {
        content_3.classList.remove('show_content');
        password_sample.value = "";
        show_password.checked = false;
        password_sample.type = show_password.checked ? "text" : "password";
        display_status.className = "";
        display_status.innerHTML = "";
        password_length.className = "";
        password_letters.className = "";
        password_numbers.className = "";
        password_symbols.className = "";
    }

//Loop for generating characters using unicode
  function generate_char(min, max) {
    var char = "";

    for(let i = min; i <= max; i++) {
      char += String.fromCharCode(i);
    }

    return char;
  }


//Characters
    var upper_letters = generate_char(65, 90);
    var lower_letters = generate_char(97, 122);
    var numbers = generate_char(48, 57);
    var symbols = generate_char(33, 47) + generate_char(58, 64) + generate_char(91, 96) + generate_char(123, 126);


//Generate Password
    function generated_password() {
        var uppercase_checkbox = document.getElementById("uppercase");
        var lowercase_checkbox = document.getElementById("lowercase");
        var number_checkbox = document.getElementById("numbers");
        var symbol_checkbox = document.getElementById("symbols");

        //Add the characters in the charset that was selected by the user
            let charset = "";
            if (uppercase_checkbox.checked) {
                charset += upper_letters;
            }
            
            if (number_checkbox.checked) {
                charset += numbers;
            }
            
            if (lowercase_checkbox.checked) {
                charset += lower_letters;
            }
            
            if (symbol_checkbox.checked) {
                charset += symbols;
            }

            if (charset === '') {
                charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234567890abcdefghijklmnopqrstuvwxyz!@#$%^&*()+=-_'?[]/|`~";
            }

        //Generating the password using the characters selected by the user
            let password = "";
            for (let i = 1; i <= range_length.value; i++) {
                var randomIndex = Math.floor(Math.random() * charset.length);
                password += charset.charAt(randomIndex);
            }        
            return password;
    }


//Insert Data
    function insert_data(generated_password) {
        //Get the current date and time
            var date = new Date().toLocaleDateString();
            var time = new Date().toLocaleTimeString();

        //Creating a data array and return that data to use for history_arr
            var data = [date, time, generated_password];
            return data;
    }


//Create History
    const table_body = document.getElementById("table");
    function create_history(history_arr) {
        history_arr.forEach(data => {
            const row = table_body.insertRow();

            data.forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
            });
        });
    }


//Display Password and History
    var display_password = document.getElementById("password");
    var generate_password = document.getElementById("generate_password");

    generate_password.addEventListener('click', () => {
        var password = generated_password();
        display_password.innerHTML = password;
    
        //Inserting the data array to the history_arr
            var data = insert_data(password);
            var history_arr = [];
            history_arr.push(data);
            create_history(history_arr);
    });


//Copy the Password to Clipboard
    var clipboard = document.getElementById("clipboard");
    clipboard.addEventListener('click', () => {
        var passwordText = document.getElementById("password");
        var textArea = document.createElement("textarea");
        var clipboard_message = document.getElementById("clipboard_message");

        textArea.value = passwordText.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        
        document.execCommand("Copy");
        document.body.removeChild(textArea);

        //Display an error message if the password is empty and will not copy to clipboard
            if (passwordText.textContent == "") {
                clipboard_message.classList.add("invalid");
                clipboard_message.innerHTML = "Password is empty";
            } else {
                clipboard_message.classList.add("valid");
                clipboard_message.innerHTML = "Copied to clipboard";
            }

        //Error message will dissapear after two seconds
            setTimeout(() => {
                clipboard_message.classList.remove(clipboard_message.classList.contains("valid") ? "valid" : "invalid");
                clipboard_message.innerHTML = "";
            }, 2000);
    });


//Clear History
    var clear_history = document.getElementById('clear_history');
    clear_history.addEventListener('click', () => {    
        while (table_body.rows.length > 1) {
            table_body.deleteRow(1);
        }
    });


//Show Password
    var show_password = document.getElementById("show_password");
    show_password.addEventListener('change', () => {
        password_sample.type = show_password.checked ? "text" : "password";
    });


//Check for Special Characters
    function check_character(password_sample, character) {
        var find_character = new RegExp('[' + character + ']');
        return find_character.test(password_sample);
    }


//Display Strength Meter Status
    var check_password = document.getElementById("check_password");
    var display_status = document.getElementById("strength_status");
    var password_length = document.getElementById("password_length");
    var password_letters = document.getElementById("password_letters");
    var password_numbers = document.getElementById("password_numbers");
    var password_symbols = document.getElementById("password_symbols");

//Main counter that will increase if the user has a specific character on their password
    let main_counter = 0;

    check_password.addEventListener('click', () => {
        //Main counter will reset for another password checking
            main_counter = 0;
            var password_sample = document.getElementById("password_sample");


            //Check if the password has symbols
                if (check_character(password_sample.value, symbols) || password_sample.value.includes("\\")) {
                    password_symbols.classList.remove("invalid");
                    password_symbols.classList.add("valid");
                    main_counter++;
                } else {
                    password_symbols.classList.remove("valid");
                    password_symbols.classList.add("invalid");
                }

            //Check if the password has upper/lower case letters
                if(check_character(password_sample.value, upper_letters) || check_character(password_sample.value, lower_letters)) {  
                    password_letters.classList.remove("invalid");
                    password_letters.classList.add("valid");
                    main_counter++;
                } else {
                    password_letters.classList.remove("valid");
                    password_letters.classList.add("invalid");
                }

            //Check if the password has numbers
                if(check_character(password_sample.value, numbers)) {  
                    password_numbers.classList.remove("invalid");
                    password_numbers.classList.add("valid");
                    main_counter++;
                } else {
                    password_numbers.classList.remove("valid");
                    password_numbers.classList.add("invalid");
                }
            
            //Check if the password has more than 8 characters
                if(password_sample.value.length >= 8) {
                    password_length.classList.remove("invalid");
                    password_length.classList.add("valid");
                } else {
                    password_length.classList.remove("valid");
                    password_length.classList.add("invalid");
                }

            //Display the password strength status
                if (main_counter <= 2 || password_sample.value.length <= 7) {
                    display_status.classList.remove("valid");
                    display_status.classList.add("invalid");
                    
                    //An error message will change if there are no password in the textbox
                        if (password_sample.value.length == 0) {
                            display_status.innerHTML = "Password is empty";
                        } else {
                            display_status.innerHTML = "Password is not strong";    
                        }
                } else {
                    display_status.classList.remove("invalid");
                    display_status.classList.add("valid");
                    display_status.innerHTML = "Password is strong";
                }
    });