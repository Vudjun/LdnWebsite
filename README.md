<h1 align="center">
  <br>
  <a href="https://ryujinx.org/"><img src="https://i.imgur.com/WcCj6Rt.png" alt="Ryujinx" width="150"></a>
  <br>
  <b>Ryujinx</b>
  <br>
  <sub><sup><b>(REE-YOU-JINX)</b></sup></sub>
  <br>

</h1>

<p style="text-align:center">
    <a href="https://discord.com/invite/VkQYXAZ">
        <img src="https://img.shields.io/discord/410208534861447168?color=5865F2&label=Ryujinx&logo=discord&logoColor=white"
            alt="Discord">
    </a>
</p>

## Configuration

This app can be configured using the following environment variables:

| Name           | Description                                                                               | Default value | Notes                                                                                                        |
| :------------- | ----------------------------------------------------------------------------------------- | :-----------: | ------------------------------------------------------------------------------------------------------------ |
| `NODE_ENV`     | This should be set to `production` or `development` depending on the current environment. |     `""`      |                                                                                                              |
| `DATA_PATH`    | The path to the data directory of this server.                                            |   `"data"`    | This can either be a relative path or an absolute path. Currently this directory only contains the log file. |
| `SOCKET_PATH`  | The path to the unix socket this server should be listening on.                           |     `""`      | If this is not empty `HOST` and `PORT` will be ignored.                                                      |
| `HOST`         | The address this server should be listening on.                                           | `"127.0.0.1"` |                                                                                                              |
| `PORT`         | The port this server should be using.                                                     |    `3000`     |                                                                                                              |
| `REDIS_URL`    | The URL of the redis server.                                                              |     `""`      | Format: `redis[s]://[[username][:password]@][host][:port][/db-number]`                                       |
| `REDIS_SOCKET` | The path to the unix socket of the redis server.                                          |     `""`      | If this is not empty `REDIS_URL` will be ignored.                                                            |

## Contribute

### Development

We do encourage you talk to some devs in #development (on our Discord) before developing any PRs so we can make sure you aren't conflicting with another dev's plans, and so we can help you get accustomed to our code base and methods.

## License

This software is licensed under the terms of the MIT license.
