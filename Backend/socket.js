const socketIO = require('socket.io');
const userModel = require('./db/models/user.models'); 
const captainModel = require('./db/models/captain.model');



let io;
function InitializeSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);


        socket.on('join',async (data) => {
            const {userId,userType} = data;
            console.log('User joining:', userId, userType);
            try {
                if (userType === 'user') {
                    
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }
            } catch (error) {
                console.error('Error updating socket ID:', error);
                socket.emit('error', { message: 'Failed to join' });
                return;
            }
            socket.emit('joined', { message: 'Joined successfully' });

            }
        );

        // Handle socket events here
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}

function SendMessageToSocketId(socketId,message){
    if(io){
        io.to(socketId).emit('message', message);

    }else{
        console.error('Socket.io is not initialized');
    }   

}
module.exports = {
    InitializeSocket,
    SendMessageToSocketId
};
