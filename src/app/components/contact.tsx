"use client";

export default function Contact() {
  const whatsappNumber = "+6287774100901"; // format internasional

  const handleSendViaWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank", "noopener,noreferrer");
  };

  // embed goole maps
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15867.123235641138!2d106.569393!3d-6.160104!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ffb6e3268ae3%3A0x9ea66a972c857736!2sGKBJ%20Regency!5e0!3m2!1sen!2sid!4v1766465635050!5m2!1sen!2sid"; // ← GANTI INI

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-blue-800">Get in Touch</h2>
            <p className="text-gray-600">
              We&apos;d love to hear from you! Chat with us or visit our location.
            </p>
          </div>

          {/* Whatsapp */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="md:w-1/2 w-full">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6 text-center">
                <p className="text-blue-900 italic font-bold">
                  For quicker response, we encourage you to reach us via WhatsApp below.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="w-full px-8 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.644-.506-.158-.007-.347-.007-.52-.007-.173 0-.446.074-.693.322-.247.247-.94 1.018-.94 2.39 0 1.373.99 2.698 1.139 2.897.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.573-.085 1.757-.709 2.006-1.403.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
                  />
                </svg>
                Send Message via WhatsApp
              </button>
            </div>

            {/* Google Maps */}
            <div className="md:w-1/2 w-full h-80">
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "0.5rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}