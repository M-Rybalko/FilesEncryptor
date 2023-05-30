# FilesEncryptor
It is a console app I did as a course project in KPI University

You can create, save and use various ciphers made by yourself using this program. You can also use it for educational purposes with pre-made morse and caesar ciphers, which are both used in school IT lessons.

No libraries were used in this project except for those that are integrated in to Node.js (fs, for example).

## Installing the program
***

First up, clone the repository via this command:

    git clone https://github.com/M-Rybalko/FilesEncryptor.git

Then run these two commands in your terminal:

Opening the source folder:

    cd src

Running the program:

    node commands.js

## Using files encryptor
***

First thing you need to know is that all commands are divided by levels: general level and custom level. There is a help command on each level. You start on general level. Custom level is entered automatically after using `create` or `import` commands. Exiting custom level is made by `exit` command.

To get acquainted with commands you might use `help` command, just as told in program.

![image](https://github.com/M-Rybalko/FilesEncryptor/assets/45692117/0912a662-8842-49e7-98fc-3c097e230698)

If you only start using files encryptor, you might want to start creating your own cipher. `create` command is made for this:

![image](https://github.com/M-Rybalko/FilesEncryptor/assets/45692117/4c8e315a-5fe1-411c-a6b0-33d221fce64b)

As it was told before, both levels have their own `help` commands. Let's add our first replacer into our cipher. Using`add` command, you can replace various character sequences with others.

![image](https://github.com/M-Rybalko/FilesEncryptor/assets/45692117/04ec99ba-d0fd-4450-b1e1-75e51833a442)
> Now all "Hello" words will be replaced with "Goodbye"

If i don't want certain parts to appear in encrypted file, I can use `omit` command.

![image](https://github.com/M-Rybalko/FilesEncryptor/assets/45692117/c0272cd8-f68f-48ab-ad2d-9ec33345d0f5)
> You can stack both replacers and omissions endlessly

If you made a mistake while creating your cipher, you can use `delete` command to correct it. 

![image](https://github.com/M-Rybalko/FilesEncryptor/assets/45692117/355764fc-29e7-4d28-9128-a3941a4d3c4a)
> `delete` has different switches each responsible for deleting either a part of the cipher, or the cipher itself

if you want to see how your cipher looks like at some point of time, use `show` command.

![image](https://github.com/M-Rybalko/FilesEncryptor/assets/45692117/f055f328-af1e-4299-a736-e2ea7760e715)

You might want to save your cipher into JSON format to not lose the progress in future. `save` command is designed to do so. Also, you will always be remembered to save your cipher upon using `exit` command.

![image](https://github.com/M-Rybalko/FilesEncryptor/assets/45692117/6445903e-fdef-48eb-9dbd-e82155d9a575)
> `save` command creates a new folder `Custom ciphers` with a folder inside called by the name of your cipher. In it you can find both components of your cipher in JSON format.

Now we can try encrypting some files! If you don't exit the program, the last cipher you worked on will be saved in memory, so you don't need to use `import` every time. In `Files Encryptor` folder you can see the `Texts` folder. Files to encrypt are stored there. Let's encrypt the "Hello world! [[[[" text.

![image](https://github.com/M-Rybalko/FilesEncryptor/assets/45692117/a7fb8f84-346e-4766-ac5e-9c4e79fc3e0c)

![image](https://github.com/M-Rybalko/FilesEncryptor/assets/45692117/4d5c7683-7607-4d12-b486-33cacd2f9ea5)

![image](https://github.com/M-Rybalko/FilesEncryptor/assets/45692117/2bfba50e-e8da-4c65-9655-9bd23892df22)
> The files are saved in `Encrypted` folder by set name. But you can change it to any name you want manually after encrypting.

After all things are done, you can leave the program by using `exit` command.

## Testing
***

I made some tests for the program. To use them, write this command: 

    node tests/tests.js
    
It expects to return all green success messages.

![image](https://github.com/M-Rybalko/FilesEncryptor/assets/45692117/b443395a-a1cb-4438-b03e-d6ec908ca9cb)
