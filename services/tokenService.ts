// tokenService.ts
import { SignJWT, importPKCS8 } from 'jose'

const PRIVATE_KEY_PEM = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIBs7uLW2rPTxFUXMB85cbg5f6V0nMJkAw+GWTakZJRY1
-----END PRIVATE KEY-----`

const KEY_ID = 'TAGXV73RXK'
const PROJECT_ID = '4AKUWPMCYJ'

export async function generateJWT() {
    try {
        // 导入私钥（Ed25519, PKCS8 格式）
        const privateKey = await importPKCS8(PRIVATE_KEY_PEM, 'EdDSA')

        // 获取当前时间戳（单位：秒）
        const iat = Math.floor(Date.now() / 1000) - 30 // 当前时间 - 30秒
        const exp = iat + 900 // 过期时间：15分钟（900秒）

        // 构造 payload
        const payload = {
            sub: PROJECT_ID,
            iat,
            exp,
        }

        // 构造 header
        const header = {
            alg: 'EdDSA',
            kid: KEY_ID,
        }

        // 创建并签名 JWT
        const jwt = await new SignJWT(payload)
            .setProtectedHeader(header)
            .sign(privateKey)

        console.log('JWT Token:', jwt)
        return jwt
    } catch (error) {
        console.error('生成 JWT 失败:', error)
        throw error
    }
}