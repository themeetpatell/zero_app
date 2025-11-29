import { db } from '@/db';
import { user } from '@/db/schema';

async function main() {
    const currentTimestamp = Date.now();
    
    const sampleUsers = [
        {
            id: 'test-user-123',
            name: 'John Smith',
            email: 'john@example.com',
            emailVerified: true,
            image: 'https://avatar.example.com/user1.jpg',
            createdAt: new Date(currentTimestamp),
            updatedAt: new Date(currentTimestamp),
        },
        {
            id: 'test-user-456',
            name: 'Jane Doe',
            email: 'jane@example.com',
            emailVerified: false,
            image: null,
            createdAt: new Date(currentTimestamp),
            updatedAt: new Date(currentTimestamp),
        }
    ];

    await db.insert(user).values(sampleUsers);
    
    console.log('✅ User seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});