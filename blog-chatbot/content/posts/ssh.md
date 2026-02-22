---
title: "configure SSH keys in terminal"
date: 2024-09-10T21:14:54+08:00
draft: false
tags: ["trick"]
---

How to use SSH to authenticate connection to remote servers and services (e.g. GitHub).

## how it works (the mechanism)

> You can access and write data in repositories on GitHub using SSH (Secure Shell Protocol). When you connect via SSH, you authenticate using a private key file on your local machine. For more information about SSH, see [Secure Shell](https://en.wikipedia.org/wiki/Secure_Shell) on Wikipedia.
>
> When you set up SSH, you will need to generate a new private SSH key and add it to the SSH agent. You must also add the public SSH key to your account on GitHub before you use the key to authenticate or sign commits.

It's basically the public-private key mechanism. It allows for asymmetric cryptography. See [Secure Shel](https://en.wikipedia.org/wiki/Secure_Shell)l and [Public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography) (Wikipedia) for details.

> In a **[digital signature](https://en.wikipedia.org/wiki/Digital_signature)** system, a sender can use a private key together with a message to create a **signature**. Anyone with the corresponding public key can verify whether the signature matches the message, but a forger who does not know the private key cannot find any message/signature pair that will pass verification with the public key.

## check SSH key on your local computer (mac)

Open terminal, execute

```bash
# Lists the files in your .ssh directory, if any exists
ls -al ~/.ssh
```

Check the directory listing to see if one already have a public SSH key. By default, the filenames of supported public keys for GitHub are one of the following:

- `id_rsa.pub`
- `id_ecdsa.pub`
- `id_ed25519.pub`

> **Tip**: If you receive an error that `~/.ssh` doesn't exist, you do not have an existing SSH key pair in the default location. You can create a new SSH key pair in the next step.

## create SSH key pairs (mac)

In terminal, type in

```python
ssh-keygen -t ed25519 -C "your_email@example.com"
```

and hit `return` all the way til the end (by this, it would execute every decision by default which would be OK). See [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key) for details behind each step.

## [Adding your SSH key to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent)

After generating a new SSH key, or having checked that there is existing SSH key, add your SSH key to the agent, use the default macOS `ssh-add` command:

First, start the ssh-agent in the background.

```bash
eval "$(ssh-agent -s)"
# > Agent pid 59566
```

> If you're using macOS Sierra 10.12.2 or later, you will need to modify your `~/.ssh/config` file to automatically load keys into the ssh-agent and store passphrases in your keychain.
>
> - First, check to see if your `~/.ssh/config` file exists in the default location.
>
>     ```bash
>     open ~/.ssh/config
>     # > The file /Users/YOU/.ssh/config does not exist.
>     ```
>
> - If the file doesn't exist, create the file.
>
>     ```shell
>     touch ~/.ssh/config
>     ```
>
> - Open your `~/.ssh/config` file, then modify the file to contain the following lines. If your SSH key file has a different name or path than the example code, modify the filename or path to match your current setup.
>
>     ```text
>     Host github.com
>       AddKeysToAgent yes
>       UseKeychain yes
>       IdentityFile ~/.ssh/id_ed25519
>     ```

## add public key to GitHub

Again, you may need to check for existing SSH keys:

```bash
ls -al ~/.ssh
```

For example, I would see

```bash
total 48
drwx------    8 aritang  staff    256 Jul 14 11:41 .
drwxr-x---+ 386 aritang  staff  12352 Sep 10 21:50 ..
-rw-------    1 aritang  staff    411 Jan 20  2024 id_ed25519
-rw-r--r--    1 aritang  staff    102 Jan 20  2024 id_ed25519.pub
-rw-------    1 aritang  staff   2635 Nov  4  2023 id_rsa
-rw-r--r--    1 aritang  staff    589 Nov  4  2023 id_rsa.pub
-rw-------    1 aritang  staff   3282 Jul 14 11:25 known_hosts
-rw-------    1 aritang  staff   2447 Jan 20  2024 known_hosts.old
```

Copy the SSH public key to clipboard:

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

And in Github, find `Add SSH key` (somewhere), paste the public key there. Later, you can use SSH access to push and commit changes to GitHub repos.

### reference

[About SSH.](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh) GitHub Docs.

[Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent). GitHub Docs.

[Adding a new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account). GitHub Docs.

