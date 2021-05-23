# Testing

```shell
yarn dev -a encode -s 16 -i Task.md -o Task.md.encrypted
yarn dev -a decode -s 16 -i Task.md.encrypted -o Task.md.decrypted
diff Task.md Task.md.decrypted
rm Task.md.encrypted
rm Task.md.decrypted
```
