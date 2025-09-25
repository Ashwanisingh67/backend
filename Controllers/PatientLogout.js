const PatientLogout = (req, res) => {
  res.clearCookie('token'); // must match the cookie name set during login
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = PatientLogout;
