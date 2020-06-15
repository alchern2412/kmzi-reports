using System;
using System.Linq;
using System.Text;
using System.Numerics;



namespace Lab9
{
    class Program
    {
        static void Main(string[] args)
        {
            BigInteger[] mass = Vector100();

            Console.WriteLine();

            BigInteger W = 0;               // Summary
            for (int i = 0; i < 8; i++)
            {
                W += mass[i];
            }
            //Console.WriteLine("w = " + W);

            string Qs = "265252859812191058636308479999999";
            BigInteger Q = BigInteger.Parse(Qs);
            Console.WriteLine("n = " + Q); // > W

            string Rs = "75838465738475849374657348573930";
            BigInteger R = BigInteger.Parse(Rs);
            Console.WriteLine("a = " + R); // < Q

            BigInteger[] B = new BigInteger[8];
            Console.WriteLine();
            Console.WriteLine("e (Открытый ключ):");

            for (int i = 0; i < 8; i++)     // Public Key
            {
                B[i] = (mass[i] * R) % Q;           // e[i] = (d[i] * a) mod n
                Console.WriteLine(B[i]);
            }
            Console.WriteLine();

            string[] set = toBin();
            BigInteger[] crypt = new BigInteger[set.Length];
            Console.WriteLine();

            Console.WriteLine("Результат зашифрования:");
            long ellapledTicks = DateTime.Now.Ticks;
            for (int i = 0; i < set.Length; i++)        // calculate by block
            {
                char[] b = set[i].ToCharArray();
                for (int j = 0; j < b.Length; j++)
                {
                    crypt[i] += BigInteger.Parse(b[j].ToString()) * B[j];
                }
                Console.WriteLine(crypt[i]);
            }
            ellapledTicks = DateTime.Now.Ticks - ellapledTicks;

            Console.WriteLine();
            Console.WriteLine("Время зашифрования: " + ellapledTicks);
            string modRs = "198053286779263733527432885858298";
            BigInteger modR = BigInteger.Parse(modRs);
            Console.WriteLine();

            //Console.WriteLine("mod r = " + modR);

            BigInteger[] startEncrypt = new BigInteger[crypt.Length];
            long ellapledTicks2 = DateTime.Now.Ticks;
            for (int i = 0; i < crypt.Length; i++)
            {
                startEncrypt[i] = (crypt[i] * modR) % Q;
            }

            string[] encrypt = new string[startEncrypt.Length];
            for (int i = 0; i < startEncrypt.Length; i++)
            {
                string currentWord = "";
                BigInteger toNull = startEncrypt[i];

                for (int j = mass.Length - 1; j >= 0; j--)
                {

                    if (toNull >= mass[j])
                    {
                        toNull -= mass[j];
                        currentWord += "1";
                    }
                    else
                    {
                        currentWord += "0";
                    }
                    //if(j==0 && toNull != 0)
                    //{
                    //    j = mass.Length - 1;
                    //}
                }
                encrypt[i] = new string(currentWord.ToCharArray().Reverse().ToArray());

            }
            ellapledTicks2 = DateTime.Now.Ticks - ellapledTicks2;

            string bicaryEncrypt = "";
            for (int i = 0; i < encrypt.Length; i++)
            {
                bicaryEncrypt += encrypt[i];
            }
            var stringArray = Enumerable.Range(0, bicaryEncrypt.Length / 8).Select(i => Convert.ToByte(bicaryEncrypt.Substring(i * 8, 8), 2)).ToArray();
            var result = Encoding.Unicode.GetString(stringArray);
            result = result.Remove(result.Length - 1);

            Console.WriteLine();
            Console.WriteLine("Расшифрование:");
            Console.WriteLine(result);
            Console.WriteLine();
            Console.WriteLine("Время расшифрования: " + ellapledTicks2);
            Console.ReadLine();
        }

        static BigInteger[] Vector100()
        {
            Random rnd = new Random();
            BigInteger[] mass = new BigInteger[8];
            mass[0] = rnd.Next(1, 9);
            Console.WriteLine("Вектор :");
            Console.WriteLine(mass[0]);
            for (int i = 1; i < 8; i++)//100 bit = 30 symbls
            {
                for (int j = 0; j < mass.Length; j++)
                {
                    BigInteger coef = rnd.Next(75, 150);
                    mass[i] += mass[j] * coef;

                }

                Console.WriteLine(mass[i]);
            }

            return mass;
        }

        static string[] toBin()
        {
            string str = "Charniauski Aliaksei";
            Console.WriteLine("Исходная строка:" + str);

            StringBuilder sb = new StringBuilder();
            foreach (byte b in Encoding.Unicode.GetBytes(str))
                sb.Append(Convert.ToString(b, 2).PadLeft(8, '0')).Append(' ');
            string binaryStr = sb.ToString();
            string[] set = binaryStr.Split(' ');
            Console.WriteLine();
            //Console.WriteLine("Бинарный формат:");
            //for (int i = 0; i < set.Length; i++)
            //{
            //    Console.WriteLine(set[i]);
            //}

            return set;
        }
    }
}
