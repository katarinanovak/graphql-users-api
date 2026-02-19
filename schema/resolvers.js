const User = require('../models/User');

const resolvers = {
    Query: {
        // Dohvatanje svih korisnika 
        users: async (_, { filter }) => {
            try {
                let query = {};
                
                if (filter?.name) {
                    query.name = { $regex: filter.name, $options: 'i' }; // case-insensitive
                } else if (filter?.email) {
                    query.email = { $regex: filter.email, $options: 'i' };
                }
                
                return await User.find(query).sort({ createdAt: -1 });
            } catch (error) {
                throw new Error('Greška pri dohvatanju korisnika: ' + error.message);
            }
        },
        
        // Dohvatanje jednog korisnika po ID
        user: async (_, { id }) => {
            try {
                const user = await User.findById(id);
                if (!user) throw new Error('Korisnik nije pronađen');
                return user;
            } catch (error) {
                throw new Error('Greška pri dohvatanju korisnika: ' + error.message);
            }
        }
    },
    
    Mutation: {
        // Dodavanje novog korisnika
        addUser: async (_, { name, email }) => {
            try {
                // Validacija email-a
                const emailRegex = /^\S+@\S+\.\S+$/;
                if (!emailRegex.test(email)) {
                    throw new Error('Email nije validan');
                }
                
                // Provera da li email već postoji
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    throw new Error('Korisnik sa ovim email-om već postoji');
                }
                
                // Kreiranje novog korisnika
                const newUser = new User({ name, email });
                await newUser.save();
                return newUser;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        
        // Brisanje korisnika
        deleteUser: async (_, { id }) => {
            try {
                const user = await User.findByIdAndDelete(id);
                if (!user) throw new Error('Korisnik nije pronađen');
                return `Korisnik ${user.name} je uspešno obrisan`;
            } catch (error) {
                throw new Error('Greška pri brisanju korisnika: ' + error.message);
            }
        }
    }
};

module.exports = resolvers;