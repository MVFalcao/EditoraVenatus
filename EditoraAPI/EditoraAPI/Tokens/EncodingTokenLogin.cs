using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EditoraAPI.Tokens
{
    public class TData {
        public int id;
        public float exp;
    }

    public class EncodingTokenLogin
    {
         //+ 432000
        const string secret = "logis";
        public string EncodeLogin(int ID)
        {
            IDateTimeProvider provider = new UtcDateTimeProvider();
            var now = provider.GetNow();
            var secondsExp = UnixEpoch.GetSecondsSince(now) + 432000;
            var payload = new Dictionary<string, object>
            {
                { "ID", ID },
                {"exp", secondsExp}
            };
           

            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);

            var token = encoder.Encode(payload, secret);
            return token;
        }
        public string ValidToken(string token)
        {
 
            try
            {
                IJsonSerializer serializer = new JsonNetSerializer();
                IDateTimeProvider provider = new UtcDateTimeProvider();
                IJwtValidator validator = new JwtValidator(serializer, provider);
                IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
                IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder);

                var json = decoder.Decode(token, secret, verify: true);
                return json;
            }
            catch (TokenExpiredException)
            {
                throw new Exception("Tempo expirado");
            }
            catch (SignatureVerificationException)
            {
                throw new Exception("Token invalido");
            }

        }


    }
}