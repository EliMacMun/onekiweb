// @ts-check
import { cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { config } from 'dotenv'
config()

export default getFirestore(
    initializeApp({
        credential: cert(JSON.parse(process.env.FIREBASE_TOKEN ?? ''))
    })
)
