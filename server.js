import { BurnerManager } from '@dojoengine/create-burner'
import { Account, RpcProvider } from 'starknet'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const rpcProvider = new RpcProvider({
  nodeUrl: 'https://api.cartridge.gg/x/warpack-masters-v2/katana',
  chainId: '0x4b4154414e41',
})

const masterAccount = new Account(
  rpcProvider,
  '0xe30e817e8238a83a4c5542ebc40eb3740f0fbd39781948fdec0110a92ca108',
  '0x75ba890aee1fbd608bcca573cd9c5794e1014a45d49cb058f2b6be1274ff6aa',
  '1'
)

const manager = new BurnerManager({
  masterAccount: masterAccount,
  accountClassHash:
    '0x05400e90f7e0ae78bd02c77cd75527280470e2fe19c54970dd79dc37a9d3645c',
  feeTokenAddress:
    '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
  rpcProvider: rpcProvider,
})

app.post('/create-burner', async (req, res) => {
  try {
    if (!manager.isInitialized) {
      await manager.init()
    }
    const account = await manager.create()
    res.json({ account })
  } catch (error) {
    res.status(500).send(error.toString())
  }
})

const rpcProvider_v3 = new RpcProvider({
  nodeUrl: 'https://api.cartridge.gg/x/warpack-masters-v3/katana',
  chainId: '0x4b4154414e41',
})

const masterAccount_v3 = new Account(
  rpcProvider_v3,
  '0xe30e817e8238a83a4c5542ebc40eb3740f0fbd39781948fdec0110a92ca108',
  '0x75ba890aee1fbd608bcca573cd9c5794e1014a45d49cb058f2b6be1274ff6aa',
  '1'
)

const manager_v3 = new BurnerManager({
  masterAccount: masterAccount_v3,
  accountClassHash:
    '0x05400e90f7e0ae78bd02c77cd75527280470e2fe19c54970dd79dc37a9d3645c',
  feeTokenAddress:
    '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
  rpcProvider: rpcProvider_v3,
})

app.post('/v3/create-burner', async (req, res) => {
  try {
    if (!manager_v3.isInitialized) {
      await manager_v3.init()
    }
    const account = await manager_v3.create()
    res.json({ account })
  } catch (error) {
    res.status(500).send(error.toString())
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
