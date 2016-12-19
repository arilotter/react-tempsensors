const Particle = {
  deviceId: '1234',
  accessToken: '1234'
};

Particle.endpoint = `https://api.particle.io/v1/devices/${Particle.deviceId}`;

export default Particle;
