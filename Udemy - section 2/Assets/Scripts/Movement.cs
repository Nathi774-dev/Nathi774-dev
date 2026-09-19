using UnityEngine;
using UnityEngine.InputSystem;
using JetBrains.Annotations;
using Unity.VisualScripting;

public class Movement : MonoBehaviour
{
    [SerializeField] InputAction thrust;
    [SerializeField] InputAction rotation;
    [SerializeField] float rotationStrength = 100f;
    [SerializeField] float thrustStrength;
    [SerializeField] AudioSource audioSource;
    [SerializeField] AudioClip mainEngine;
    [SerializeField] ParticleSystem rightBooster;
    [SerializeField] ParticleSystem leftBooster;
    [SerializeField] ParticleSystem mainBooster;
    Rigidbody rb;

    private void Start()
    {
        rb = GetComponent<Rigidbody>();
        audioSource = GetComponent<AudioSource>();
    }
    private void OnEnable()
    {
        thrust.Enable();
        rotation.Enable();
    }

    private void FixedUpdate()
    {
        Controller();
    }

    void Controller()
    {
        ProcessThrust();
        HandleRotation();
    }

    private void ProcessThrust()
    {
        if (thrust.IsPressed())
        {
            rb.AddRelativeForce(Vector3.up * thrustStrength * Time.fixedDeltaTime);
            if (!audioSource.isPlaying && !mainBooster.isPlaying)
            {
                audioSource.PlayOneShot(mainEngine);
                mainBooster.Play();
            }
        }
        else
        {
            audioSource.Stop();
            mainBooster.Stop();
        }
    }

    private void ApplyRotation(float rotationValue)
    {
        rb.freezeRotation = true;
        transform.Rotate(Vector3.forward * rotationValue * Time.fixedDeltaTime);
        rb.freezeRotation = false;
    }

    void HandleRotation()
    {
        float rotationInput = rotation.ReadValue<float>();

        if (rotationInput < 0)
        {
            SteerPlayer("left");
        }
        else if (rotationInput > 0)
        {
            SteerPlayer("right");
        } else
        {
            leftBooster.Stop();
            rightBooster.Stop();
        }
    }

    void SteerPlayer(string direction)
    {
        if (direction == "left")
        {
            ApplyRotation(-rotationStrength);
            if (!leftBooster.isPlaying)
            {
                leftBooster.Play();
            } 
        } else if (direction == "right")
        {
            ApplyRotation(rotationStrength);
            if (!rightBooster.isPlaying)
            {
                rightBooster.Play();
            }
        }
    }
}
