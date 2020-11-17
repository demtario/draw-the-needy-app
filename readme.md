# Draw the Needy App

## Purpose

App for the **D.A. Górka**, to generate a "choosen Needy" for given week.

## Preparation

Clone the repo and install dependencies.

```bash
$ yarn
or
$ npm i
```

Then you should copy `.env.example` file into `.env` and insert your Gmail credentials into it.

**Disclaimer:**
_For now, only **Gmail** accounts are supported, you should also have a ["Less secure apps access" enabled](https://support.google.com/accounts/answer/6010255?hl=en)_

Now you can fill all users that should receive the email about the **Needy**, to do this you need to copy `targets.json.example` into `targets.json` and fill in all users details as in example:

```json
[
  {
    "name": "test",
    "email": "test@example.com
  }
]
```

You have to do simmilar thing with a `needies.json.example` file. In it, you need to enter all Needies names, these are the people from whom script will random select one.

```json
["John Smith", "Mike Kowalsky", "Joshua Wolf"]
```

## Sending mails

If you prepared all data, you can simply run a script using:

```bash
$ yarn start
or
$ npm run start
```

## Advanced use case

In `.env` you can modify some of the parameters used by the app

| Variable              | Description                                                                          | Default        |
| --------------------- | ------------------------------------------------------------------------------------ | -------------- |
| `NEEDY_TIMEOUT_WEEKS` | How long given needy is baned from beeing choosen again                              | `4`            |
| `DB_FILE`             | Path to the file that keeps the information about previously generated Needies       | `db.json`      |
| `NEEDIES_FILE`        | Path to the file that keeps all Needies                                              | `needies.json` |
| `TARGETS_FILE`        | Path to the file that keeps all email addresses to send info about generated Needies | `targets.json` |
