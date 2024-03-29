class School {
  constructor(
    schoolId,
    name,
    address,
    city,
    state,
    board,
    pincode,
    contactNumber,
    email,
    website,
    logo,
    banner,
    aboutUs,
    mission,
    image,
    ourInspiration,
    productsId,
    uniformId
  ) {
    this.id = schoolId;
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.board = board;
    this.pincode = pincode;
    this.contactNumber = contactNumber;
    this.email = email;
    this.website = website;
    this.logo = logo;
    this.banner = banner;
    this.aboutUs = aboutUs;
    this.mission = mission;
    this.image = image;
    this.ourInspiration = ourInspiration;
    this.productsId = productsId || [];
    this.uniformId = uniformId || [];
  }

  toJson() {
    return {
      schoolId: this.id,
      name: this.name,
      address: this.address,
      city: this.city,
      state: this.state,
      board: this.board,
      pincode: this.pincode,
      contactNumber: this.contactNumber,
      email: this.email,
      website: this.website,
      logo: this.logo,
      banner: this.banner,
      aboutUs: this.aboutUs,
      mission: this.mission,
      image: this.image,
      ourInspiration: this.ourInspiration,
      productsId: this.productsId,
      uniformId: this.uniformId,
    };
  }
}

export default School;
